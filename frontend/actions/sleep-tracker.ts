"use server";

import { backendRequest } from "./backend";

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
};
