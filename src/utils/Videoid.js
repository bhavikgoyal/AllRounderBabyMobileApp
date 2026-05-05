import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/api';

async function fetchVideoById(videoId, annotate = null, options = {}) {
    if (!videoId) throw new Error('videoId is required');
    const { userId: optUserId, token: optToken } = options;

    let resolvedUserId = optUserId;
    let resolvedToken = optToken;

    if (!resolvedUserId || !resolvedToken) {
        const results = await Promise.all([
            resolvedUserId ? Promise.resolve(resolvedUserId) : AsyncStorage.getItem('userId'),
            resolvedToken ? Promise.resolve(resolvedToken) : AsyncStorage.getItem('token'),
        ]);
        resolvedUserId = results[0];
        resolvedToken = results[1];
    }

    const body = {
        UserId: resolvedUserId ? parseInt(resolvedUserId, 10) : null,
        VideoId: videoId,
        annotate: annotate || JSON.stringify({}),
    };

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    if (resolvedToken) headers.Authorization = `Bearer ${resolvedToken}`;

    const res = await fetch(`${BASE_URL}Vdocipher/GetVideosFromVDOCipher_VideoId`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
    }

    return await res.json();
}

export default fetchVideoById;
export { fetchVideoById };
