"use server";
import { makeRequest } from "./backend";

export const getAllNotes = async () =>
  makeRequest("note", "GET", true, "Błąd w trakcie pobierania notatek");

export const getSuggestions = async () =>
  makeRequest(
    "note/suggestions",
    "GET",
    true,
    "Błąd w trakcie pobierania sugestii"
  );

export const getNote = async (id: string) =>
  makeRequest(`note/${id}`, "GET", true, "Błąd w trakcie pobierania notatki");

export const getNotesByMonth = async (date: Date) =>
  makeRequest(
    `note/month/${date.toDateString()}`,
    "GET",
    true,
    "Błąd w trakcie pobierania notatek"
  );

export const createNote = async (body: unknown) =>
  makeRequest(
    "note",
    "POST",
    true,
    "Błąd w trakcie tworzenia notatki",
    "Pomyślnie zapisano notatkę",
    body
  );

export const updateNote = async (body: unknown, id: string) =>
  makeRequest(
    `note/${id}`,
    "PUT",
    true,
    "Błąd w trakcie aktualizacji notatki",
    "Pomyślnie zaktualizowano notatkę",
    body
  );

export const deleteNote = async (id: string) =>
  makeRequest(
    `note/${id}`,
    "DELETE",
    true,
    "Błąd w trakcie usuwania notatki",
    "POmyślnie usunięto notatkę"
  );

export const getStreak = async () =>
  makeRequest("note/streak", "GET", true, "Błąd w trakcie pobierania streaka");
