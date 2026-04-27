import { BASE_URL } from '../../config/api';

export async function getFcmTokenById({ userId, deviceId } = {}) {
    try {
        const base = (typeof BASE_URL === 'string' && BASE_URL) ? BASE_URL.replace(/\/$/, '') : '';
        const urlBase = base ? `${base}/FcmToken/GetFcmTokenById` : `/FcmToken/GetFcmTokenById`;

        const params = new URLSearchParams();
        if (typeof userId !== 'undefined' && userId !== null) params.append('userId', String(userId));
        if (typeof deviceId !== 'undefined' && deviceId !== null) params.append('deviceId', String(deviceId));


        const qs = params.toString();
        const url = qs ? `${urlBase}?${qs}` : urlBase;

        const resp = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        let result = null;
        try { result = await resp.json(); } catch (e) { result = null; }

        return { ok: resp.ok, status: resp.status, result };
    } catch (err) {
        console.error('getFcmTokenById error', err);
        return { ok: false, status: 0, result: null, error: String(err) };
    }
}

export default getFcmTokenById;
