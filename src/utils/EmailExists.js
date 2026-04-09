import { BASE_URL } from '../config/api';

export async function checkEmailExists(email) {
    if (!email) return { ok: false, status: 0, exists: false, message: 'No email provided' };

    const base = (typeof BASE_URL === 'string' && BASE_URL) ? BASE_URL.replace(/\/$/, '') : '';
    const url = base
        ? `${base}/Login/UsersDetails_EmailExist?emailAddress=${encodeURIComponent(email)}`
        : `/Login/UsersDetails_EmailExist?emailAddress=${encodeURIComponent(email)}`;
    try {
        const resp = await fetch(url, { method: 'GET', headers: { 'Accept': 'text/plain, application/json' } });
        const text = await resp.text().catch(() => '');
        let exists = false;
        let message = text || '';

        const positiveRe = /\bexist(s)?\b/i;
        const negativeRe = /\b(not\s+exist|does\s+not\s+exist|doesn't\s+exist|dont\s+exist|doesnt\s+exist|no\s+such)\b/i;

        // If server returned 404 treat as not exists (many APIs use 404 for missing resource)
        if (resp.status === 404) {
            exists = false;
            return { ok: resp.ok, status: resp.status, exists, message, text };
        }

        try {
            const parsed = text ? JSON.parse(text) : null;
            if (parsed && typeof parsed === 'object') {
                if ('exists' in parsed) exists = Boolean(parsed.exists);
                else if ('isExists' in parsed) exists = Boolean(parsed.isExists);
                else if ('success' in parsed) exists = Boolean(parsed.success);
                else {
                    const msg = parsed.message || parsed.Message || JSON.stringify(parsed);
                    message = msg;
                    exists = positiveRe.test(msg) && !negativeRe.test(msg);
                }
            } else if (typeof parsed === 'string') {
                message = parsed;
                exists = positiveRe.test(parsed) && !negativeRe.test(parsed);
            } else {
                // plain text response
                exists = positiveRe.test(text) && !negativeRe.test(text);
            }
        } catch (e) {
            // Not JSON — inspect plain text
            exists = positiveRe.test(text) && !negativeRe.test(text);
        }

        return { ok: resp.ok, status: resp.status, exists, message, text };
    } catch (err) {
        console.error('checkEmailExists error', err, 'url:', url);
        return { ok: false, status: 0, exists: false, message: String(err) };
    }
}

export default checkEmailExists;
