import { useParams } from 'react-router-dom';
import articles from './article-content';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
import { useEffect, useState } from 'react';
import CommentList from '../components/CommentList';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`)
            const newArticleInfo = response.data
            setArticleInfo(newArticleInfo);
        }

        loadArticleInfo();
    }, []);

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
        <CommentList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;