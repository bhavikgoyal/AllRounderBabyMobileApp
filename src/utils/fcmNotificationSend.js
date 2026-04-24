import { BASE_URL } from '../config/api';

async function FCMNotificationSend(deviceToken, title, body, data = {}) {
    if (!deviceToken || !title || !body) {
        console.warn('FCMNotificationSend: Missing required parameters');
        return { ok: false, status: 0, result: null, error: 'Missing required parameters' };
    }

    const requestBody = {
        DeviceToken: deviceToken,
        Title: title,
        Body: body,
    };

    if (data && Object.keys(data).length) {
        requestBody.Data = data;
    }

    try {
        const res = await fetch(`${BASE_URL}/Notification/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        let json = null;
        try {
            json = await res.json();
        } catch (e) {
        }

        if (!res.ok) {
            return { ok: false, status: res.status, result: json, error: json?.Message || 'Request failed' };
        }

        return { ok: true, status: res.status, result: json };
    } catch (error) {
        return { ok: false, status: 0, result: null, error: error?.message || String(error) };
    }
}

export default FCMNotificationSend;
export { FCMNotificationSend as sendNotification };
