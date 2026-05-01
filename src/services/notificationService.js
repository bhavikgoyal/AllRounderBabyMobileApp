import { Platform, Alert, PermissionsAndroid, Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import insertFcmToken from '../utils/fcm api/InsertFcmToken';
import updateFcmToken from '../utils/fcm api/UpdateFcmToken';
import getFcmTokenById from '../utils/fcm api/GetFcmTokenById';
import existstocken from '../utils/fcm api/ExistToken';
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

export async function getFcmToken({ sendToServer = true, forceRefresh = false } = {}) {
    try {
        if (forceRefresh) {
            try {
                await messaging().deleteToken();
                console.log('Deleted existing FCM token to force refresh');
            } catch (e) {
                console.warn('deleteToken failed (continuing):', e);
            }
        }

        const token = await messaging().getToken();
        if (token) {
            await AsyncStorage.setItem('fcmToken', token);
            try { console.log('Saved FCM token to AsyncStorage:', token); } catch (e) { }
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
        const resolvedDeviceId = deviceId || await getDeviceKey();
        const check = await getFcmTokenById({
            userId,
            deviceId: resolvedDeviceId
        });

        const result = check?.result;
        const existingRecord = Array.isArray(result) ? result[0] : result || null;

        console.log('Existing record:', existingRecord);


        if (existingRecord) {

            console.log('Token exists → generating new token & updating');

            let newToken = null;

            try {
                const gen = await getFcmToken({
                    sendToServer: false,
                    forceRefresh: true
                });

                newToken = gen?.ok ? gen.token : null;
            } catch (e) {
                console.warn('Token generation failed', e);
            }

            if (!newToken) {
                return { ok: false, error: 'failed-to-generate-token' };
            }

            const model = {
                UserId: userId,
                FcmToken: newToken,
                DeviceType: deviceType || Platform.OS,
                DeviceId: resolvedDeviceId,
                IsActive: true
            };

            const upd = await updateFcmToken(model);

            console.log('Updated token result:', upd);

            if (upd?.ok) {
                await AsyncStorage.setItem('fcmToken', newToken);

                return {
                    ok: true,
                    action: 'updated',
                    token: newToken,
                    result: upd.result
                };
            }

            return {
                ok: false,
                error: 'update-failed',
                details: upd
            };
        }

        console.log('No existing record → inserting new token');


        let tokenToInsert = null;

        try {
            const gen = await getFcmToken({
                sendToServer: false,
                forceRefresh: true
            });

            tokenToInsert = gen?.ok ? gen.token : null;
        } catch (e) {
            console.warn('Token generation failed', e);
        }

        if (!tokenToInsert) {
            return { ok: false, error: 'no-token-available' };
        }


        const model = {
            UserId: userId,
            FcmToken: tokenToInsert,
            DeviceType: deviceType || Platform.OS,
            DeviceId: resolvedDeviceId,
            IsActive: true
        };

        const ins = await insertFcmToken(model);

        console.log('Insert result:', ins);

        if (ins?.ok) {
            await AsyncStorage.setItem('fcmToken', tokenToInsert);

            return {
                ok: true,
                action: 'inserted',
                token: tokenToInsert,
                result: ins.result
            };
        }

        return {
            ok: false,
            error: 'insert-failed',
            details: ins
        };

    } catch (err) {
        console.error('syncFcmTokenInBackground error', err);

        return {
            ok: false,
            error: String(err)
        };
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
