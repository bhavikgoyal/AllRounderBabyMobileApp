import { BASE_URL } from '../config/api';

export async function verifyOtp(userId, flag, otpValue) {
    try {
        const payload = {
            contact: flag,
            otp: otpValue
        };

        const base = (typeof BASE_URL === 'string' && BASE_URL)
            ? BASE_URL.replace(/\/$/, '')
            : '';

        const verifyUrl = base + '/OTP/Verify';

        const resp = await fetch(verifyUrl, {
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
            data: result
        };

    } catch (err) {
        console.error('verifyOtp error', err);
        return {
            ok: false,
            status: 0,
            data: null,
            error: String(err)
        };
    }
}

export default verifyOtp;