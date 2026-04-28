import { BASE_URL } from '../../config/api';


export async function existtoken(fcmToken) {
    if (!fcmToken) return { ok: false, status: 0, success: false, exists: false, message: 'Missing fcmToken', result: null, error: 'Missing fcmToken' };

    try {
        const base = (typeof BASE_URL === 'string' && BASE_URL) ? BASE_URL.replace(/\/$/, '') : '';
        const encoded = encodeURIComponent(fcmToken);
        const url = base ? `${base}/FcmToken/IsFcmTokenExists?fcmToken=${encoded}` : `/FcmToken/IsFcmTokenExists?fcmToken=${encoded}`;

        const resp = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        let result = null;
        try { result = await resp.json(); } catch (e) { result = null; }

        const success = !!(result && result.success === true);
        const exists = !!(result && result.exists === true);
        const message = result && typeof result.message === 'string' ? result.message : null;

        return { ok: resp.ok, status: resp.status, success, exists, message, result };
    } catch (err) {
        console.error('existtoken error', err);
        return { ok: false, status: 0, success: false, exists: false, message: 'Network error', result: null, error: String(err) };
    }
}

export default existtoken;
