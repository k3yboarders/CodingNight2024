"use client"
import { getArticle } from '@/actions/articles';
import { PrimaryButton } from '@/components/notes/ui/primary-button';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ArticlePage = () => {
  const {articleId} = useParams() ;
  const [article, setArticle] = useState({});

  const fetchArticle = async () => {
    try {
        const response = await getArticle(articleId! as string);
        console.log(response)
        setArticle(response);
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
  }
  useEffect(() => {
    fetchArticle();
  }, [])

  return (
    <div>
      {article && article.data && <>
      <h1 className='text-3xl'>{article.data.title}</h1>
      <p className='my-2'>{article.data.content}</p>
      <PrimaryButton>Klawo</PrimaryButton>
      </>
      }
    </div>
  );
};

export default ArticlePage;