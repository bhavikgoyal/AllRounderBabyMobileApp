export async function sendWhatsAppOtp(mobile, templateName, method, parameters = []) {
    try {
        const payload = typeof createWhatsAppOtpPayload === 'function'
            ? createWhatsAppOtpPayload(mobile, templateName, method, parameters)
            : { Mobile: mobile, TemplateName: templateName, Method: method, Parameters: parameters };

        const base = (typeof apiUrlBase === 'string' && apiUrlBase) ? apiUrlBase.replace(/\/$/, '') : '';
        const url = base ? base + '/SMS/Whatsapp_Otp_Send' : '/SMS/Whatsapp_Otp_Send';
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await resp.json().catch(() => null);
        return { ok: resp.ok, status: resp.status, data: result };
    } catch (err) {
        // keep logging minimal
        console.error('sendWhatsAppOtp error', err);
        return { ok: false, status: 0, data: null, error: String(err) };
    }
}

export async function sendEmailTemplateRequest(toEmail, templateName = 'OTP Login ID', method = 'Email', toName = '', variables = [], userid) {
    if (!toEmail || !templateName || !method) {
        return { ok: false, status: 0, data: null, message: 'Missing required parameters' };
    }

    const payload = {
        ToEmail: toEmail,
        ToName: toName || '',
        TemplateName: templateName,
        Method: method,
        Variables: Array.isArray(variables) ? variables : [],
        Userid: userid
    };

    const base = (typeof apiUrlBase === 'string' && apiUrlBase) ? apiUrlBase.replace(/\/$/, '') : '';
    const url = base ? base + '/SMS/Email_Send' : '/SMS/Email_Send';

    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(typeof token === 'string' && token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify(payload)
        });

        const result = await resp.json().catch(() => null);
        return { ok: resp.ok, status: resp.status, data: result };
    } catch (err) {
        console.error('sendEmailTemplateRequest error', err);
        return { ok: false, status: 0, data: null, error: String(err) };
    }
}

export default {
    sendWhatsAppOtp,
    sendEmailTemplateRequest
};
