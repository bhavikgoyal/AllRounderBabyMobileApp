import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/api';

async function sendVideoData(payload = {}, options = {}) {
    const { token: optToken, includeDeviceKey = true } = options;
    try {
        if (includeDeviceKey) {
            const deviceKey = await AsyncStorage.getItem('deviceKey');
            if (deviceKey) payload.DeviceKey = deviceKey;
        }

        let token = optToken || (await AsyncStorage.getItem('token'));

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}User/User_Video_Data`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`HTTP ${res.status}: ${text}`);
        }

        return await res.json();
    } catch (err) {
        throw err;
    }
}

export default sendVideoData;
export { sendVideoData };
