import { BASE_URL } from '../config/api';

export async function sendWhatsAppOtp(mobile, parameters = []) {
    try {
        const payload =
        {
            Mobile: mobile,
            TemplateName: 'OTP Login ID',
            Method: 'WhatsApp',
            Parameters: parameters
        };

        const base = (typeof BASE_URL === 'string' && BASE_URL) ? BASE_URL.replace(/\/$/, '') : '';
        const url = base + '/SMS/Whatsapp_Otp_Send';
        try {
            const resp = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const text = await resp.text();
            let result = null;
            try { result = text ? JSON.parse(text) : null; } catch { result = text; }

            return { ok: resp.ok, status: resp.status, data: result };
        } catch (netErr) {
            console.error('sendWhatsAppOtp network error', netErr, 'url:', url, 'payload:', payload);
            return { ok: false, status: 0, data: null, error: String(netErr), url };
        }
    } catch (err) {
        console.error('sendWhatsAppOtp error', err);
        return { ok: false, status: 0, data: null, error: String(err) };
    }
}

export default sendWhatsAppOtp;

