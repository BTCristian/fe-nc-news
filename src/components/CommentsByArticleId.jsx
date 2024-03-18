import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId, postComment } from "../../utils/api";
import ErrorPage from "./ErrorPage";

export default function CommentsByArticleId({ id, activeUserName }) {
  let articleId = id;
  const [commentId, setCommentId] = useState(null);
  const [commentsList, setCommentsList] = useState([]);

  const [isLoading, setIsloading] = useState(true);

  const [newComment, setNewComment] = useState("");
  const [err1, setErr1] = useState(null);
  const [errByFetch, setErrByFetch] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    getCommentsByArticleId(id)
      .then((response) => {
        setCommentsList(response.data.comments);
        setIsloading(false);
      })
      .catch((error) => {
        setErrByFetch(error.response);
      });
  }, []);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    setDisabledBtn(true);
    setCommentsList((currentComments) => [
      {
        author: activeUserName,
        body: newComment,
        votes: 0,
      },
      ...currentComments,
    ]);
    setErr1(null);
    const msg = {
      username: activeUserName,
      body: newComment,
    };
    postComment(id, msg)
      .then(() => {
        setNewComment("");
        setDisabledBtn(false);
      })
      .catch((err) => {
        setCommentsList((currentComments) => {
          return currentComments.filter(
            (comment) => comment.body != newComment
          );
        });
        setErr1("Something went wrong, please try again");
      });
  };
  if (errByFetch) {
    return <ErrorPage err={errByFetch} />;
  }
  return (
    <div className="commentsBlock">
      <form className="commentsForm" onSubmit={handleSubmitComment}>
        <textarea
          name=""
          id="newComment"
          cols="60"
          rows="4"
          placeholder="Your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        {disabledBtn ? (
          <button className="sendBtn" disabled>
            <i className="fa-regular fa-paper-plane sendIcon"></i>Send
          </button>
        ) : (
          <button className="sendBtn">
            <i className="fa-regular fa-paper-plane sendIcon"></i>Send
          </button>
        )}
      </form>
      <div className="error">{err1 ? <h4>{err1}</h4> : null}</div>
      {isLoading ? <h5 className="statusMessage">Loading...</h5> : null}
      {commentsList.length === 0 ? (
        <h5 className="statusMessage">
          No comments yet... Be the first to comment!
        </h5>
      ) : (
        <ul className="commentsList">
          {commentsList.map((comment) => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                articleId={articleId}
                activeUserName={activeUserName}
                commentId={comment.comment_id}
                setCommentsList={setCommentsList}
                commentsList={commentsList}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
