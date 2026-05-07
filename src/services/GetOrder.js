
import { BASE_URL } from '../config/api';


export async function getOrderByUserId(userId, baseUrl) {
    if (userId === undefined || userId === null || userId === '') {
        throw new Error('userId is required');
    }

    const chosenBase = String((baseUrl || BASE_URL)).replace(/\/$/, '');
    const url = `${chosenBase}/Payment/GetByUserId?userId=${encodeURIComponent(String(userId))}`;

    const res = await fetch(url, { method: 'GET' });

    const contentType = res.headers.get('content-type') || '';

    if (!res.ok) {
        if (contentType.includes('application/json')) {
            const errJson = await res.json();
            const err = new Error(errJson.message || `Request failed with status ${res.status}`);
            err.status = res.status;
            err.body = errJson;
            throw err;
        }
        const text = await res.text();
        const err = new Error(`Request failed with status ${res.status}`);
        err.status = res.status;
        err.body = text;
        throw err;
    }

    if (contentType.includes('application/json')) {
        const json = await res.json();
        if (json && typeof json === 'object' && 'data' in json) return json.data;
        return json;
    }

    return res.text();
}

export default getOrderByUserId;
