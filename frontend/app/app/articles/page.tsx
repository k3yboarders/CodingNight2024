'use client'
import { getArticleCategories } from "@/actions/articles";
import ArticleCategory from "./category";
import { useEffect, useState } from "react";

const ArticlesPage = () => {
    const [articleCategories, setArticleCategories] = useState({});
    const fetchCategories = async () => {
        try {
            const response = await getArticleCategories();
            setArticleCategories(response);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div>
            {articleCategories && articleCategories.data && articleCategories.data.map((category: any, key: number) => (
                <ArticleCategory key={key} title={category.name} categoryId={category.id}/>
            ))}
        </div>
    )
}

export default ArticlesPage;