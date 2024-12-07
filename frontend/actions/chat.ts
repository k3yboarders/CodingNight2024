"use server";
import { makeRequest } from "./backend";

export const getPsychologist = async () =>
  makeRequest(
    "message/psychologist",
    "GET",
    true,
    "Błąd w trakcie pobierania psychologa"
  );
export const sendMessage = async (content: string, receiverId: string) =>
  makeRequest(
    "message",
    "POST",
    true,
    "Błąd w trakcie wysyłania wiadomości",
    undefined,
    { content, receiverId }
  );

export const getUserConversations = async () =>
  makeRequest(
    "message/conversations",
    "GET",
    true,
    "Błąd w trakcie pobierania konwersacji użytkownika"
  );

export const getConversationMessages = async (partnerId: string) =>
  makeRequest(
    `message/conversation/${partnerId}`,
    "GET",
    true,
    "Błąd w trakcie pobierania wiadomości z konwersacji"
  );
