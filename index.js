import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';


if (typeof __DEV__ !== 'undefined' && !__DEV__) {
    console.log = () => { };
    console.error = () => { };
    console.warn = () => { };
    console.info = () => { };
}

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
