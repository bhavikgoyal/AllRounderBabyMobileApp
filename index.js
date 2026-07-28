import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

try {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        try {
            const svc = require('./src/services/notificationService');
            if (svc && typeof svc.showNotification === 'function') {
                await svc.showNotification(remoteMessage);
            }
        } catch (e) {
            console.warn('background handler error (index.js)', e);
        }
    });
} catch (error) {
    console.warn('Firebase messaging initialization error:', error);
}

AppRegistry.registerComponent(appName, () => App);
