import { BASE_URL } from '../../config/api';

export async function updateFcmToken(model) {
    if (!model) return { ok: false, status: 0, success: false, message: 'Missing model', result: null, error: 'Missing model' };

    try {
        const base = (typeof BASE_URL === 'string' && BASE_URL) ? BASE_URL.replace(/\/$/, '') : '';
        const url = base ? `${base}/FcmToken/UpdateFcmToken` : `/FcmToken/UpdateFcmToken`;

        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(model)
        });

        let result = null;
        try { result = await resp.json(); } catch (e) { result = null; }

        // Normalize to the API shape: { success: bool, message: string }
        const success = !!(result && result.success === true);
        const message = result && typeof result.message === 'string' ? result.message : null;

        return { ok: resp.ok, status: resp.status, success, message, result };
    } catch (err) {
        console.error('updateFcmToken error', err);
        return { ok: false, status: 0, success: false, message: 'Network error', result: null, error: String(err) };
    }
}

export default updateFcmToken;
