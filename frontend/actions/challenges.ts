'use server'
import { makeRequest } from "./backend";

export const getAllUsersChallenges = async () => 
    makeRequest('challenge', 'GET', true, 'Błąd w trakcie pobierania wyzwań');

export const getUserChallenge = async (challengeId: string) => 
    makeRequest(`challenge/${challengeId}`, 'GET', true, 'Błąd w trakcie pobierania wyzwania');