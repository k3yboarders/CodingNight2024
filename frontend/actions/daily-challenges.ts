"use server";
import { makeRequest } from "./backend";

export const getDailyChallenge = async (date: Date) =>
  makeRequest(
    `daily-challenge/${date.toISOString()}`,
    "GET",
    true,
    "Błąd w trakcie pobierania codziennego wyzwania"
  );

export const getDailyChallengeStreak = async () =>
  makeRequest(
    "daily-challenge/streak",
    "GET",
    true,
    "Błąd w trakcie pobierania serii codziennych wyzwań"
  );

export const completeDailyChallenge = async (id: string) =>
  makeRequest(
    `daily-challenge/complete/${id}`,
    "GET",
    true,
    "Błąd w trakcie oznaczania wyzwania jako ukończone"
  );
