import { BASE_URL } from '../config/api';

export async function resetPasswordRequest(identifier, password) {
    if (!identifier || !password) {
        return { ok: false, message: 'Missing parameters' };
    }

    const base = (typeof BASE_URL === 'string' && BASE_URL)
        ? BASE_URL.replace(/\/$/, '')
        : '';

    const url = base + '/Login/ForgetPassword_UsersDetails';

    // ✅ Always send EmailAddress (backend handles email + WhatsApp)
    const payload = {
        emailAddress: identifier,
        password: password
    };

    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const text = await resp.text();

        let result = null;
        try {
            result = text ? JSON.parse(text) : null;
        } catch {
            result = text;
        }

        return {
            ok: resp.ok,
            status: resp.status,
            result: result
        };

    } catch (err) {
        console.error('resetPasswordRequest error', err);
        return { ok: false, message: String(err) };
    }
}

export default resetPasswordRequest;