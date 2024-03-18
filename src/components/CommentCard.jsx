import { useState } from "react";
import CommentsByArticleId from "./CommentsByArticleId";
import { deleteCommentById, updateCommentVotes } from "../../utils/api";

export default function CommentCard({
  comment,
  articleId,
  activeUserName,
  commentId,
  setCommentsList,
  commentsList,
}) {
  // let date = comment.created_at.split('T');
  const [likeCount, setLikeCount] = useState(0);
  const [likeDisabled, setLikeDisabled] = useState(false);
  const [dislikeDisabled, setDislikeDisabled] = useState(false);

  const [err, setErr] = useState(null);

  let copyState = [...commentsList];

  //    Like
  const handleLikeClick = () => {
    setLikeCount((currentCount) => currentCount + 1);
    setErr(null);
    setLikeDisabled(true);
    setDislikeDisabled(false);

    const votes = { inc_votes: 1 };
    updateCommentVotes(commentId, votes).catch((err) => {
      setLikeDisabled(false);
      setLikeCount((currentCount) => currentCount - 1);
      setErr("Something went wrong, please try again");
    });
  };
  //    Dislike
  const handleDislikeClick = () => {
    setLikeCount((currentCount) => currentCount - 1);
    setErr(null);
    setLikeDisabled(false);
    setDislikeDisabled(true);

    const votes = { inc_votes: -1 };
    updateCommentVotes(commentId, votes).catch((err) => {
      setDislikeDisabled(false);
      setLikeCount((currentCount) => currentCount + 1);
      setErr("Something went wrong, please try again");
    });
  };
  //    Delete comment
  const deleteComment = (idComment) => {
    setCommentsList((currentComments) => {
      return currentComments.filter(
        (comment) => comment.comment_id != idComment
      );
    });

    deleteCommentById(idComment)
      .then((response) => {
        alert(`Comment deleted successfully!`);
      })
      .catch((error) => {
        setCommentsList(copyState);
        alert(`Something went wrong, please try again`);
      });
  };

  return (
    <div className="commentCard">
      <div className="commentsHeader">
        <h3>{comment.author}</h3>
        {activeUserName === comment.author ? (
          <div className="handleBlock">
            <button
              className="btn deleteBtn deleteBtnComment"
              onClick={() => {
                deleteComment(commentId);
              }}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
      <div className="commentsBody">{comment.body}</div>
      <div className="commentsFooter">
        {/* <p className="date">{date[0]}</p> */}
        <div className="likesDislikesWrapper">
          <div className="likes">
            {likeDisabled ? (
              <button className="likesBtn" onClick={handleLikeClick} disabled>
                <i
                  style={{ fontWeight: "bold" }}
                  className="fa-regular fa-heart likeIcon "
                ></i>{" "}
              </button>
            ) : (
              <button className="likesBtn" onClick={handleLikeClick}>
                <i className=" fa-regular fa-heart likeIcon"></i>{" "}
              </button>
            )}
            <p>{comment.votes + likeCount}</p>
          </div>
          <div className="dislikes">
            {dislikeDisabled ? (
              <button
                disabled
                className="likesBtn"
                onClick={handleDislikeClick}
              >
                <i
                  style={{ fontWeight: "bold" }}
                  className="fa-regular fa-thumbs-down disLikeIcon"
                ></i>
              </button>
            ) : (
              <button className="likesBtn" onClick={handleDislikeClick}>
                <i className="fa-regular fa-thumbs-down disLikeIcon"></i>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="error">{err ? <h4>{err}</h4> : null}</div>
    </div>
  );
}
