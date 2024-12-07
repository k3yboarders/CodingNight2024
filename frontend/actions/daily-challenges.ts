'use server'
import { makeRequest } from "./backend";

export const getDailyChallenge = async (date: Date) => 
    makeRequest(
        `daily-challenge/${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`,
        'GET',
        true,
        'Błąd w trakcie pobierania codziennego wyzwania');

export const createDailyChallenge = async (body: unknown) => 
    makeRequest('daily-challenge', 'POST', true, 
        'Błąd w trakcie tworzenia codziennego wyzwania',
        'Pomyślnie zapisano codzienne wyzwanie', body);
        
export const deleteDailyChallenge = async (id: string) => 
    makeRequest(`daily-challenge/${id}`, 'DELETE', true, 
        'Błąd w trakcie usuwania codziennego wyzwania',
        'Pomyślnie usunięto codzienne wyzwanie');
        
export const updateDailyChallenge = async (body: unknown, id: string) => 
    makeRequest(`daily-challenge/${id}`, 'PUT', true, 
        'Błąd w trakcie aktualizacji codziennego wyzwania',
        'Pomyślnie zaktualizowano codzienne wyzwanie', body);