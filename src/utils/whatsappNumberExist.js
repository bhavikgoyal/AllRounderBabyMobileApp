import { BASE_URL } from '../config/api';

async function checkWhatsappNumber(whatsAppNumber) {
    if (!whatsAppNumber || !whatsAppNumber.toString().trim()) {
        return { ok: false, status: 0, data: null, exists: false, message: 'Missing number' };
    }

    try {
        const base = (typeof BASE_URL === 'string' && BASE_URL) ? BASE_URL.replace(/\/$/, '') : '';
        const url = `${base}/Login/WhatsappNumber_Exist?whatsAppNumber=${encodeURIComponent(whatsAppNumber)}`;

        const resp = await fetch(url, { method: 'GET' });
        const text = await resp.text().catch(() => null);
        let result = null;
        try { result = text ? JSON.parse(text) : null; } catch { result = text; }

        let exists = false;
        let fullNumber = null;
        let message = null;
        const body = result ?? null;
        if (body) {
            message = body.message || body.Message || body.msg || null;
            if (typeof body.Data !== 'undefined' && body.Data) {
                fullNumber = body.Data;
            } else if (typeof body.data !== 'undefined' && body.data) {
                const d = body.data;
                if (typeof d === 'string') fullNumber = d;
                else if (d && (d.Data || d.data)) fullNumber = d.Data || d.data;
            } else if (typeof body === 'string') {
                fullNumber = body;
            }

            if (typeof body.IsSuccess !== 'undefined') exists = Boolean(body.IsSuccess);
            if (!exists && typeof body.isSuccess !== 'undefined') exists = Boolean(body.isSuccess);
            if (!exists && typeof body.success !== 'undefined') exists = Boolean(body.success);
            if (!exists && typeof body.code !== 'undefined') exists = String(body.code) === '200';
            if (!exists && typeof body.Code !== 'undefined') exists = String(body.Code) === '200';
        }

        // If server returned a value in result or parsed Data, consider it exists
        if (!exists && fullNumber) exists = true;

        // If server returned 404, normalize a friendly message
        if (!message && resp && resp.status === 404) {
            message = 'WhatsApp number not found.';
        }

        return { ok: resp.ok, status: resp.status, data: result, exists, fullNumber: fullNumber || null, message };
    } catch (err) {
        console.error('checkWhatsappNumber error', err);
        return { ok: false, status: 0, data: null, exists: false, error: String(err) };
    }
}

export default checkWhatsappNumber;