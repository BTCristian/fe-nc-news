import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "./api";
import ArticleCard from "./ArticleCard";
import CommentList from "./CommentList";
import "./ArticleDetails.css";

export default function ArticleDetails() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading article:", err);
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading article details...</div>;
  }

  if (isError) {
    return <div>Error loading article details. Please try again later</div>;
  }

  return (
    <div className="article-details-container">
      {article && (
        <>
          <ArticleCard article={article} />
          <button className="vote-button">👍 Vote ({article.votes})</button>
          <div className="comment-form-container">
            <form className="comment-form">
              <textarea placeholder="What are your thoughts..."></textarea>
              <button type="submit">Post Comment</button>
            </form>
          </div>
          <CommentList article_id={article_id} />
        </>
      )}
    </div>
  );
}
