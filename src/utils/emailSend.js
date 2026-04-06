import { BASE_URL } from '../config/api';

export async function sendOtpEmail(email, name = '') {
    if (!email || !email.toString().trim()) {
        return { ok: false, status: 0, result: null, error: 'Missing email' };
    }

    const payload = {
        ToEmail: email,
        ToName: name || '',
        TemplateName: 'OTP Login ID',
        Method: 'Email',
        Variables: []
    };
    if (typeof callEmailSendApi === 'function') {
        try {
            return await callEmailSendApi(payload);
        } catch (e) {
            return { ok: false, status: 0, result: null, error: e && e.message ? e.message : e };
        }
    }
    try {
        const base = (typeof BASE_URL === 'string' && BASE_URL) ? BASE_URL.replace(/\/$/, '') : '';
        const url = base + '/SMS/Email_Send';
        try {
            const resp = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            let result = null;
            try { result = await resp.json(); } catch (e) { }
            return { ok: resp.ok, status: resp.status, result };
        } catch (netErr) {
            console.error('sendOtpEmail network error', netErr, 'url:', url, 'payload:', payload);
            return { ok: false, status: 0, result: null, error: String(netErr), url };
        }
    } catch (e) {
        return { ok: false, status: 0, result: null, error: e && e.message ? e.message : e };
    }
}

export default sendOtpEmail;
