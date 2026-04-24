import { BASE_URL } from '../../config/api';

export async function insertFcmToken(model) {
    if (!model) return { ok: false, status: 0, result: null, error: 'Missing model' };

    try {
        if (typeof BASE_URL === 'undefined') {
            console.warn('InsertFcmToken: BASE_URL is undefined');
        }
        const base = (typeof BASE_URL === 'string' && BASE_URL) ? BASE_URL.replace(/\/$/, '') : '';
        const url = base ? `${base}/FcmToken/InsertFcmToken` : `/FcmToken/InsertFcmToken`;

        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(model)
        });

        let result = null;
        try { result = await resp.json(); } catch (e) { result = null; }

        return { ok: resp.ok, status: resp.status, result };
    } catch (err) {
        console.error('insertFcmToken error', err);
        return { ok: false, status: 0, result: null, error: String(err) };
    }
}

export default insertFcmToken;
