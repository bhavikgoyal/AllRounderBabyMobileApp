import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

// Background handler must be registered at the JS entry point so it runs when
// the app receives background messages. We call our service helper to display
// a system notification when possible.
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

AppRegistry.registerComponent(appName, () => App);
