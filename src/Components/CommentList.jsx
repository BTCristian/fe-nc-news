import { useState, useEffect } from "react";
import { getCommentsByArticleId, deleteComment } from "./api";
import "./CommentList.css";

export default function CommentList({ article_id, isCommentPosted }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const currentUser = {
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  };

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
  }, [article_id, isCommentPosted, isDeleted]);

  const handleDeleteComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== commentId)
    );

    deleteComment(commentId)
      .then(() => {
        console.log("Comment deleted successfully!");
        setIsDeleted(true);
      })
      .catch((err) => {
        console.error("Error deleting comment: ", err);
        setComments((prevComments) => {
          [
            ...prevComments,
            comments.find((comment) => comment.comment_id === commentId),
          ];
        });
        setIsDeleted(false);
      });
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading comments...</p>
        <img
          src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1259.gif"
          alt="loading animation"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error loading comments. Please try again later</p>
        <img
          src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
          alt="404 error image"
        />
      </div>
    );
  }

  return (
    <div>
      <ul className="comment-list" key="comment-list">
        {comments &&
          comments.map((comment) => {
            return (
              <li key={comment.comment_id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="comment-body">{comment.body}</p>
                <div>
                  {currentUser.username === comment.author && (
                    <button
                      className="delete-comment-button"
                      onClick={() => handleDeleteComment(comment.comment_id)}
                    >
                      Delete comment
                    </button>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
