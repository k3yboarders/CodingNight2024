'use server';

import { cookies } from 'next/headers';
import { backendRequest } from './backend';

export const getUserInfo = async () => {
    const cookieStore = await cookies();
    const userInfo = cookieStore.get('userInfo');
    if (!userInfo) {
        return null;
    }
    return JSON.parse(userInfo.value);
};

export const registerUser = async (
    values: { email: string; username: string; password: string }
) => {
    try {
        const response = await backendRequest('auth/register', 'POST', false, values);
        if (response.ok) {
            await response.json();
            return { success: "Rejestracja zakończona sukcesem", error: null };
        }
        return { success: null, error: "Nieprawidłowe dane rejestracyjne" };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: null, error: "Wystąpił błąd! Spróbuj ponownie później." };
    }
};


export const login = async (
    values: { email: string; password: string }
) => {
    try {
        const response = await backendRequest('auth/login', 'POST', false, values);
        if (response.ok) {
            const data = await response.json();
            const cookieStore = await cookies();
            cookieStore.set('token', data.token);
            cookieStore.set('userInfo', JSON.stringify(data.userInfo));
            return { error: null, success: "Zalogowano pomyślnie" };
        }
        return { error: "Nieprawidłowe dane", success: null };
    } catch (error) {
        console.error('Error logging in:', error);
        return { error: "Coś poszło nie tak!", success: null };
    }
};

export const logout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    cookieStore.delete('userInfo');
};

export const forgotPassword = async (email: string) => {
    try {
        const response = await backendRequest('auth/password/forgot', 'POST', false, {
            email,
        });
        return response.status;
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        throw error;
    }
};

export const resetPassword = async (resetId: string, newPassword: string) => {
    try {
        const response = await backendRequest('auth/password/reset', 'POST', false, {
            tempId: resetId,
            newPassword,
        });
        return response.status;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};

export const changePassword = async (
    oldPassword: string,
    newPassword: string
) => {
    try {
        const response = await backendRequest('auth/password/change', 'PUT', true, {
            oldPassword,
            newPassword,
        });
        return response.status;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};

export const isUserLoggedIn = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    return token ? token.value !== null : false;
};