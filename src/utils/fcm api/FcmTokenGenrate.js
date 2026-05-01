import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import getDeviceKey from '../deviceKey';


async function requestNotificationPermission() {
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


async function generateFcmToken(options = {}) {
    const { userId = null, sendToServer = true, extra = {} } = options;

    const perm = await requestNotificationPermission();
    if (!perm.ok && Platform.OS === 'ios') {
        return { ok: false, error: 'Push permission not granted', permission: perm };
    }

    try {
        const token = await messaging().getToken();
        console.log('Generated FCM Token:', token);
        return { ok: true, token };
    } catch (error) {
        return { ok: false, error: error?.message || String(error) };
    }
}

export default generateFcmToken;
export { generateFcmToken, requestNotificationPermission };
