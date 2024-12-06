"use server";

import { backendRequest } from "./backend";

export const getRandomQuote = async () => {
    try {
        const response = await backendRequest('quotes/random', 'GET', false);
        if (response.ok) {
            const data = await response.json();
            return { error: null, data, success: "Pomyślnie pobrano cytat" };
        }
        return { error: "Wystąpił błąd", success: null };
    } catch (error) {
        console.error('Error logging in:', error);
        return { error: "Coś poszło nie tak!", success: null };
    }
};