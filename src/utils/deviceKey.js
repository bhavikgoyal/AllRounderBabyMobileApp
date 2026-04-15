import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getDeviceKey() {
    try {
        let devicekey = await AsyncStorage.getItem('devicekey');
        if (!devicekey) {
            devicekey = Date.now().toString(36) + Math.random().toString(36).substring(2);
            await AsyncStorage.setItem('devicekey', devicekey);
            console.log('Generated new devicekey:', devicekey);
        } else {
            console.log('Using existing devicekey:', devicekey);
        }
        return devicekey;
    } catch (e) {
        console.error('getDeviceKey error', e);
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
}

export default getDeviceKey;
