import { BASE_URL } from '../../config/api';

export async function updateFcmToken(model) {
    if (!model) return { ok: false, status: 0, result: null, error: 'Missing model' };

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

        return { ok: resp.ok, status: resp.status, result };
    } catch (err) {
        console.error('updateFcmToken error', err);
        return { ok: false, status: 0, result: null, error: String(err) };
    }
}

export default updateFcmToken;
