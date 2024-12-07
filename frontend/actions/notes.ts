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

export const getSuggestion = async (id: string) =>
  makeRequest(
    `note/suggestion/${id}`,
    "GET",
    true,
    "Błąd w trakcie pobierania sugestii"
  );
  
export const getSuggestionsByMonth = async (date: Date) =>
  makeRequest(
    `note/suggestion/month/${encodeURIComponent(date.toISOString())}`,
    "GET",
    true,
    "Błąd w trakcie pobierania sugestii z miesiąca"
  );

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Gets a single note by its id.
 * @param id The id of the note to be retrieved.
 * @returns The requested note.
 * @throws {Error} If the note with the given id does not exist.
 */
/******  53ed56a8-bed7-4b2a-b949-35e6f4e79ce2  *******/
export const getNote = async (id: string) =>
  makeRequest(`note/${id}`, "GET", true, "Błąd w trakcie pobierania notatki");

export const getNotesByMonth = async (date: Date) =>
  makeRequest(
    `note/month/${encodeURIComponent(date.toDateString())}`,
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
