"use server";

import { backendRequest, makeRequest } from "./backend";

export const getSleepDataByDay = async (values: { date: Date }) => {
  try {
    const formattedDate = `${values.date.getFullYear()}-${values.date.getMonth() + 1}-${values.date.getDate()}`;
    const response = await backendRequest(
      `sleep-tracker/day/${formattedDate}`,
      "GET",
      true
    );
    if (response.ok) {
      const data = await response.json();
      return { error: null, data, success: "Pomyślnie pobrano artykuły" };
    }
    return { error: "Wystąpił błąd", success: null };
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: "Coś poszło nie tak!", success: null };
  }
}

export const addSleepRecord = async (values: { from: Date; to: Date; comment: string }) =>
    makeRequest('sleep-tracker', 'POST', true, 
        'Błąd w trakcie dodawania trackera snu',
        'Pomyślnie dodano trackera snu', values);

export const updateSleepRecord =
async (values: { from: Date; to: Date; comment: string }, id: string) =>
    makeRequest(`sleep-tracker/${id}`, 'PUT', true, 
        'Błąd w trakcie aktualizacji trackera snu',
        'Pomyślnie zaktualizowano tracker snu', values);
        
export const getSleepAnalysis = async (values: { from: Date; to: Date }) =>
    makeRequest(`sleep-tracker/analysis?from=${values.from}&to=${values.to}`, 'GET', true, 
        'Błąd w trakcie pobierania analizy snu');
    
export const deleteSleepRecord = async (id: string) =>
    makeRequest(`sleep-tracker/${id}`, 'DELETE', true, 
        'Błąd w trakcie usuwania trackera snu');