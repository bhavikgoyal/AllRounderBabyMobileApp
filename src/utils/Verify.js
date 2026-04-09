import { BASE_URL } from '../config/api';

export async function verifyOtp(userId, flag, otpValue) {
    try {
        const contact = (flag || '').toString().trim();
        const otp = (otpValue || '').toString().trim();

        const payload = {
            Contact: contact,
            Otp: otp
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
        const normalized = {
            success: result?.success ?? result?.IsSuccess ?? result?.isSuccess ?? (resp.ok || resp.status === 200),
            message: result?.message ?? result?.Message ?? (typeof result === 'string' ? result : ''),
            userId: result?.userId ?? result?.UserID ?? 0,
            contact: result?.contact ?? result?.Contact ?? contact,
            raw: result
        };

        return {
            ok: resp.ok,
            status: resp.status,
            data: normalized
        };
    } catch (err) {
        console.error('verifyOtp error', err);
        return {
            ok: false,
            status: 0,
            data: { success: false, message: null, userId: 0, contact: null, raw: null },
            error: String(err)
        };
    }
}

export default verifyOtp;