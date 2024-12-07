'use server'

import { makeRequest } from "./backend";

interface Settings {
    username?: string;
    email: string;
    expectedSleepTime: number;
}

export const updateSettings = (settings: Settings) => 
    makeRequest('user/settings', 'PUT', true, 'Błąd w trakcie aktualizacji ustawień', 
        'Pomyślnie zaktualizowano ustawienia',
        settings
    );

export const getSettings = () => 
    makeRequest('user/settings', 'GET', true, 'Błąd w trakcie pobierania ustawień');