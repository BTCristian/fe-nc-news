import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "./api";
import "./CommentList.css";

export default function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getCommentsByArticleId(article_id)
      .then((commentsData) => {
        setComments(commentsData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading comments:", err);
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (isError) {
    return <div>Error loading comments. Please try again later</div>;
  }

  return (
    <div>
      <ul className="comment-list">
        {comments &&
          comments.map((comment) => {
            return (
              <li key={comment.comment_id} className="comment-item">
                {comment.body}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
