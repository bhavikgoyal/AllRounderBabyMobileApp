import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

// Set up background message handler
// This must be called before AppRegistry.registerComponent
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

// import { Alert } from 'react-native';

// Alert.alert('INDEX', 'INDEX.JS LOADED');

// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);