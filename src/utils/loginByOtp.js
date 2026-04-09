import { BASE_URL } from '../config/api';

export async function loginByOtp(username, deviceId = '') {
    if (!username) return { ok: false, status: 0, data: null, message: 'Missing username' };
    try {
        const base = (typeof BASE_URL === 'string' && BASE_URL) ? BASE_URL.replace(/\/$/, '') : '';
        const url = `${base}/Login/LoginByOtp?username=${encodeURIComponent(username)}&deviceId=${encodeURIComponent(deviceId)}`;

        const resp = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const text = await resp.text();
        let data = null;
        try { data = text ? JSON.parse(text) : null; } catch { data = text; }
        return { ok: resp.ok, status: resp.status, data };
    } catch (err) {
        console.error('loginByOtp error', err);
        return { ok: false, status: 0, data: null, error: String(err) };
    }
}
export default loginByOtp;
