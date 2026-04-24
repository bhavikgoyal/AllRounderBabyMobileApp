import { Platform, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import insertFcmToken from '../utils/fcm api/InsertFcmToken';
import getDeviceKey from '../utils/deviceKey';

let notifee = null;
try {
    // try to require notifee if installed
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    notifee = require('@notifee/react-native');
} catch (e) {
    notifee = null;
}
// Normalize default export shape (some bundlers expose default)
if (notifee && notifee.default) notifee = notifee.default;
if (notifee) {
    console.log('notifee available');
    try { console.log('notifee available, keys:', Object.keys(notifee)); } catch (e) { }
}

// Request permission (iOS) and return whether permission is granted
export async function requestPushNotifications() {
    try {
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
                    try { console.log('Using deviceId for FCM insert:', deviceId); } catch (e) { }
                    const model = {
                        FcmToken: token,
                        DeviceType: Platform.OS,
                        DeviceId: deviceId,
                    };
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

// Create Android notification channel - noop here unless you install a notifications library
export async function createChannel() {
    if (Platform.OS !== 'android') return { ok: true };
    if (!notifee) {
        console.warn('createChannel: notifee not installed. Install @notifee/react-native to show system notifications.');
        return { ok: false, error: 'notifee-not-installed' };
    }

    try {
        const createdFlag = await AsyncStorage.getItem('notifee_channel_created');
        if (createdFlag === 'true') {
            return { ok: true, channelId: 'default', reused: true };
        }

        // prefer createChannel, fall back to alternative shapes
        let channelId = null;
        const importance = (notifee && notifee.AndroidImportance && notifee.AndroidImportance.HIGH) ? notifee.AndroidImportance.HIGH : 4; // 4 == HIGH
        try {
            if (typeof notifee.createChannel === 'function') {
                channelId = await notifee.createChannel({ id: 'default', name: 'Default Channel', importance });
            }
        } catch (e) {
            console.warn('createChannel call failed', e);
            channelId = null;
        }
        try { await AsyncStorage.setItem('notifee_channel_created', 'true'); } catch (e) { }
        if (channelId) return { ok: true, channelId };
        console.warn('createChannel: notifee.createChannel did not return an id');
        return { ok: false, error: 'createChannel-failed' };
    } catch (e) {
        console.warn('createChannel error', e);
        return { ok: false, error: String(e) };
    }
}

// Simple local display helper (replace with a proper local-notification library)
export async function showNotifications(remoteMessage) {
    try {
        const notif = remoteMessage?.notification;
        const body = notif?.body || (remoteMessage?.data && JSON.stringify(remoteMessage.data)) || '';
        const title = notif?.title || 'Notification';
        if (notifee) {
            try {
                // display system notification
                await notifee.displayNotification({
                    title,
                    body,
                    android: {
                        channelId: 'default',
                        smallIcon: 'ic_stat_notify',
                        pressAction: { id: 'default' },
                    },
                    ios: {},
                });
                return { ok: true };
            } catch (e) {
                console.warn('notifee displayNotification failed', e);
            }
        }

        // fallback to Alert
        Alert.alert(title, body);
        return { ok: true };
    } catch (e) {
        return { ok: false, error: String(e) };
    }
}

// Foreground listener helper. Returns the unsubscribe function.
export function foreGoundLisneter() {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        try {
            console.log('FCM foreground message', remoteMessage);
            await showNotifications(remoteMessage);
        } catch (e) {
            console.warn('foreground handler error', e);
        }
    });
    return unsubscribe;
}

export default {
    requestPushNotifications,
    getFcmToken,
    createChannel,
    showNotifications,
    foreGoundLisneter,
};
