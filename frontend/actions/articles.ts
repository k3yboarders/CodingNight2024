"use server";

import { backendRequest } from "./backend";

export const getArticles = async (
    values: { categoryId: string }
) => {
    try {
        const path = values.categoryId ? `article?categoryId=${values.categoryId}` : 'article'; 
        const response = await backendRequest(path, 'GET', true);
        if (response.ok) {
            const data = await response.json();
            return { error: null, data, success: "Pomyślnie pobrano artykuły" };
        }
        return { error: "Wystąpił błąd", success: null };
    } catch (error) {
        console.error('Error logging in:', error);
        return { error: "Coś poszło nie tak!", success: null };
    }
};

export const getArticleCategories = async () => {
    try {
        const response = await backendRequest('article/categories', 'GET', true);
        if (response.ok) {
            const data = await response.json();
            return { error: null, data, success: "Pomyślnie pobrano kategorie artykułów" };
        }
        return { error: "Wystąpił błąd", success: null };
    } catch (error) {
        console.error('Error logging in:', error);
        return { error: "Coś poszło nie tak!", success: null };
    }
};

export const addArticle = async (
    values: { title: string; content: string; categoryId: string }
) => {
    try {
        const response = await backendRequest('article', 'POST', true, values);
        if (response.ok) {
            await response.json();
            return { error: null, success: "Pomyślnie dodano artykuł" };
        }
        return { error: "Wystąpił błąd", success: null };
    } catch (error) {
        console.error('Error logging in:', error);
        return { error: "Coś poszło nie tak!", success: null };
    }
};

export const updateArticle = async (
    values: { title: string; content: string; categoryId: string },
    id: string
) => {
    try {
        const response = await backendRequest(`article/${id}`, 'PUT', true, values);
        if (response.ok) {
            await response.json();
            return { error: null, success: "Pomyślnie zaktualizowano artykuł" };
        }
        return { error: "Wystąpił błąd", success: null };
    } catch (error) {
        console.error('Error logging in:', error);
        return { error: "Coś poszło nie tak!", success: null };
    }
};

export const deleteArticle = async (
    id: string
) => {
    try {
        const response = await backendRequest(`article/${id}`, 'DELETE', true);
        if (response.ok) {
            await response.json();
            return { error: null, success: "Pomyślnie usunięto artykuł" };
        }
        return { error: "Wystąpił błąd", success: null };
    } catch (error) {
        console.error('Error logging in:', error);
        return { error: "Coś poszło nie tak!", success: null };
    }
};

export const bookmarkArticle = async (
    id: string
) => {
    try {
        const response = await backendRequest(`article/bookmark/${id}`, 'POST', true);
        if (response.ok) {
            await response.json();
            return { error: null, success: "Pomyślnie dodano artykuł do zakładek" };
        }
        return { error: "Wystąpił błąd", success: null };
    } catch (error) {
        console.error('Error logging in:', error);
        return { error: "Coś poszło nie tak!", success: null };
    }
};
