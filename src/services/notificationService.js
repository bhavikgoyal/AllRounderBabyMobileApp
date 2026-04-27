import { Platform, Alert, PermissionsAndroid, Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import insertFcmToken from '../utils/fcm api/InsertFcmToken';
import updateFcmToken from '../utils/fcm api/UpdateFcmToken';
import getFcmTokenById from '../utils/fcm api/GetFcmTokenById';
import getDeviceKey from '../utils/deviceKey';

let notifee = null;
try {
    notifee = require('@notifee/react-native');
    if (notifee && notifee.default) notifee = notifee.default;
} catch (e) {
    notifee = null;
}

export async function requestPushNotifications() {
    try {
        if (Platform.OS === 'android') {
            const sdk = Number(Platform.Version) || 0;
            if (sdk >= 33 && PermissionsAndroid && PermissionsAndroid.request) {
                const res = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                const granted = res === PermissionsAndroid.RESULTS.GRANTED;
                return { ok: granted, status: granted ? 'granted' : res };
            }
            return { ok: true, status: 'granted' };
        }

        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        return { ok: enabled, status: authStatus };
    } catch (err) {
        return { ok: false, error: String(err) };
    }
}

export async function getFcmToken({ sendToServer = true } = {}) {
    try {
        const token = await messaging().getToken();
        if (token) {
            await AsyncStorage.setItem('fcmToken', token);
            try { console.log('Saved FCM token to AsyncStorage:', token); } catch (e) { }
            if (sendToServer) {
                try {
                    const deviceId = await getDeviceKey();
                    const model = { FcmToken: token, DeviceType: Platform.OS, DeviceId: deviceId };
                    const insertResult = await insertFcmToken(model);
                    try { console.log('insertFcmToken result:', insertResult); } catch (e) { }
                } catch (e) {
                    console.warn('getFcmToken: insertFcmToken failed', e);
                }
            }
        }
        return { ok: true, token };
    } catch (error) {
        return { ok: false, error: error?.message || String(error) };
    }
}

export async function syncFcmTokenInBackground({
    userId,
    fcmToken,
    deviceId,
    deviceType
} = {}) {
    try {
        if (!fcmToken) {
            return { ok: false, error: 'Missing fcmToken' };
        }

        const resolvedDeviceId = deviceId || await getDeviceKey();
        console.log('syncFcmTokenInBackground: resolvedDeviceId:', resolvedDeviceId, 'userId:', userId, 'fcmToken:', fcmToken, 'deviceType:', deviceType);
        const check = await getFcmTokenById({ userId, deviceId: resolvedDeviceId });
        console.log('syncFcmTokenInBackground getFcmTokenById result:', check);

        const model = {
            UserId: userId,
            FcmToken: fcmToken,
            DeviceType: deviceType || Platform.OS,
            DeviceId: resolvedDeviceId,
            IsActive: true
        };

        const exists = check && check.ok && check.result && (Array.isArray(check.result) ? check.result.length > 0 : true);

        if (exists) {
            const found = Array.isArray(check.result) ? check.result[0] : check.result;
            const tokenFromServer = found?.fcmToken || found?.FcmToken || fcmToken;
            try { await AsyncStorage.setItem('fcmToken', tokenFromServer); } catch (e) { }
            return { ok: true, action: 'found', resp: found };
        }

        let resp = null;
        try {
            resp = await updateFcmToken(model);
            try { console.log('syncFcmTokenInBackground updateFcmToken result:', resp); } catch (e) { }
        } catch (e) {
            console.error('syncFcmTokenInBackground updateFcmToken failed', e);
            return { ok: false, error: String(e) };
        }

        const tokenFromResp = resp && (resp.fcmToken || resp.FcmToken || (resp.result && (resp.result.fcmToken || resp.result.FcmToken)));
        if (tokenFromResp) {
            try { await AsyncStorage.setItem('fcmToken', tokenFromResp); } catch (e) { }
        }

        return { ok: resp?.ok ?? true, action: 'updated', resp };



    } catch (err) {
        console.error('syncFcmTokenInBackground error', err);
        return { ok: false, error: String(err) };
    }
}
export async function createChannel() {
    if (Platform.OS !== 'android') return { ok: true };
    if (!notifee) {
        console.warn('createChannel: notifee not installed. Install @notifee/react-native to show system notifications.');
        return { ok: false, error: 'notifee-not-installed' };
    }

    try {
        const channelId = await notifee.createChannel({ id: 'default', name: 'Default Channel', importance: 4 });
        try { await AsyncStorage.setItem('notifee_channel_created', 'true'); } catch (e) { }
        return { ok: true, channelId };
    } catch (e) {
        console.warn('createChannel error', e);
        return { ok: false, error: String(e) };
    }
}

export async function showNotification(remoteMessage) {
    try {
        const notif = remoteMessage?.notification;
        const body = notif?.body || (remoteMessage?.data && JSON.stringify(remoteMessage.data)) || '';
        const title = notif?.title || 'Notification';

        if (notifee) {
            try {
                await notifee.displayNotification({ title, body, android: { channelId: 'default', smallIcon: 'ic_stat_notify', pressAction: { id: 'default' } }, ios: {} });
                return { ok: true };
            } catch (e) {
                console.warn('notifee displayNotification failed', e);
            }
        }

        Alert.alert(title, body);
        return { ok: true };
    } catch (e) {
        return { ok: false, error: String(e) };
    }
}

export function foregroundListener() {
    return messaging().onMessage(async (remoteMessage) => {
        try {
            console.log('FCM foreground message', remoteMessage);
            await showNotification(remoteMessage);
        } catch (e) {
            console.warn('foreground handler error', e);
        }
    });
}

export default {
    requestPushNotifications,
    getFcmToken,
    syncFcmTokenInBackground,
    createChannel,
    showNotification,
    foregroundListener,
};
