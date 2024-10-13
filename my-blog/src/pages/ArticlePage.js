import { useParams } from 'react-router-dom';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';
import { useEffect, useState } from 'react';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comment: [] });

    useEffect(()=>{
        setArticleInfo({ upvotes: 3, comment: [] });
    })

    const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId);

    if(!article) {
        return <NotFoundPage />
    }
    
    return (
        <>
        <h1>{article.title}</h1>
        <p>This article has {articleInfo.upvotes}</p>
        {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ))}
        </>
    );
}

export default ArticlePage;