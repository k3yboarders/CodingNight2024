'use server';

import { cookies } from 'next/headers';

const BACKEND_ORIGIN = 'http://localhost:5001';

export const backendRequest = async (
    path: string,
    method: string,
    useAuth: boolean,
    body?: unknown
) => {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get ? cookieStore.get('token') : null;
    const token = tokenCookie ? tokenCookie.value : null;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (token && useAuth) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    try {
        return await fetch(`${BACKEND_ORIGIN}/${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });
    } catch (error) {
        console.error('Error in backendRequest:', error);
        throw error;
    }
};