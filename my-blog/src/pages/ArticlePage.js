import { useParams } from "react-router-dom";
import articles from "./article-content";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import { useEffect, useState } from "react";
import CommentList from "../components/CommentList";
import AddCommentForm from "../components/AddCommentForm";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };

    loadArticleInfo();
  }, []);

  const article = articles.find((article) => article.name === articleId);

  //make an upvote button
  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-Section">
        {/* if user logged in , show upvote button, otherwise log in */}
        {user ? (
          <button onClick={addUpvote}>Upvote</button>
        ) : (
          <button>Log in</button>
        )}
        <p>This article has {articleInfo.upvotes}</p>
      </div>

      {article.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}

      {/* check if the user is login otherwise show logIn button */}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button> LogIn to Comment</button>
      )}
      <CommentList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
