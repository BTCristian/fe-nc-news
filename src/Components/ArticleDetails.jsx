import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, voteArticle, postComment } from "./api";
import ArticleCard from "./ArticleCard";
import CommentList from "./CommentList";
import "./ArticleDetails.css";

export default function ArticleDetails() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [isCommentPosted, setIsCommentPosted] = useState(false);

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

  const handleVote = (vote) => {
    setArticle((currentArticle) => ({
      ...currentArticle,
      votes: currentArticle.votes + vote,
    }));
    setVoteError(null);
    voteArticle(article_id, vote).catch((err) => {
      console.error("Error voting on article: ", err);
      setArticle((currentArticle) => ({
        ...currentArticle,
        votes: currentArticle.votes - vote,
      }));
      setVoteError("Something went wrong with voting, please try again");
    });
  };

  const handleSubmitCommment = () => {
    setCommentError(null);

    if (comment.length === 0) {
      setCommentError("Please enter a comment...");
      return;
    }

    const newComment = {
      username: "grumpy19",
      body: comment,
      created_at: new Date().toISOString(),
    };

    setArticle((currentArticle) => ({
      ...currentArticle,
      comments: currentArticle.comments
        ? [...currentArticle.comments, newComment]
        : [newComment],
    }));

    postComment(article_id, newComment.username, comment)
      .then(() => {
        setArticle((currentArticle) => ({
          ...currentArticle,
          comments: currentArticle.comments
            ? [...currentArticle.comments, newComment]
            : [newComment],
        }));
        setIsCommentPosted(true);

        setComment("");
        setTimeout(() => {
          setIsCommentPosted(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error posting comment: ", err);

        setArticle((currentArticle) => ({
          ...currentArticle,
          comments: currentArticle.comments
            ? currentArticle.comments.slice(0, -1)
            : [],
        }));
        setCommentError("Failed to publish comment. Please try again.");
      });
  };

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
          <div className="vote-buttons">
            <button className="vote-button" onClick={() => handleVote(1)}>
              👍
            </button>
            <button className="vote-button" onClick={() => handleVote(-1)}>
              👎
            </button>
          </div>

          <span>Votes: {article.votes}</span>
          <div className="comment-form-container">
            <form
              className="comment-form"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmitCommment();
              }}
            >
              <textarea
                id="comment-textarea"
                placeholder="What are your thoughts..."
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                required
              ></textarea>

              {commentError && <div className="error">{commentError}</div>}
              {isCommentPosted && (
                <div className="success-posted-comment">
                  Comment posted succesfully!
                </div>
              )}
              {!isCommentPosted && (
                <div className="success-posted-comment hidden">Placeholder</div>
              )}
              <button type="submit">Post Comment</button>
            </form>
          </div>
          <CommentList
            key={comment.comment_id}
            article_id={article_id}
            isCommentPosted={isCommentPosted}
          />
        </>
      )}
    </div>
  );
}
