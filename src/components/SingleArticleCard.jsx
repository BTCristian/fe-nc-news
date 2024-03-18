import { Link } from "react-router-dom";
import { useState } from "react";
import CommentsByArticleId from "./CommentsByArticleId";
import { updateVotesForArticleById } from "../../utils/api";

export default function SingleArticleCard({
  article,
  activeUserName,
  id,
  setVoteArticle,
  voteArticle,
  date,
}) {
  const [err, setErr] = useState(null);
  const [likeDisabled, setLikeDisabled] = useState(false);
  const [dislikeDisabled, setDislikeDisabled] = useState(false);

  const handleLikeClick = () => {
    setVoteArticle((currentCount) => currentCount + 1);
    setLikeDisabled(true);
    setDislikeDisabled(false);
    setErr(null);
    const votes = { inc_votes: 1 };
    updateVotesForArticleById(id, votes).catch((err) => {
      setLikeDisabled(false);
      setVoteArticle((currentCount) => currentCount - 1);
      setErr("Something went wrong, please try again");
    });
  };

  const handleDislikeClick = () => {
    setVoteArticle((currentCount) => currentCount - 1);
    setLikeDisabled(false);
    setDislikeDisabled(true);
    setErr(null);
    const votes = { inc_votes: -1 };
    updateVotesForArticleById(id, votes).catch((err) => {
      setVoteArticle((currentCount) => currentCount + 1);
      setDislikeDisabled(false);
      setErr("Something went wrong, please try again");
    });
  };

  return (
    <div className="singleArticleCard">
      <img
        className="articleImg articleImgSingle"
        src={article.article_img_url}
        alt={article.title}
      />

      <h2 className="singleHeading">{article.title}</h2>
      <div className="createdBlock createdBlock_singleArt">
        <Link className="linkAuthor" to={`/article?author=${article.author}`}>
          Created by: <span className="spanNameAuthor">{article.author} </span>
        </Link>

        <p className="createdDate">{date}</p>
      </div>
      <p className="articleBody">{article.body}</p>

      <div className="singleArticleFooter">
        {/* {activeUserName===article.author ? <div className="editDelBtnWrapper">
                    <button className="btn deleteBtn">Delete</button>
                </div> : <div></div> }   */}
        <div></div>
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
            <p>{voteArticle}</p>
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
      <CommentsByArticleId activeUserName={activeUserName} id={id} />
    </div>
  );
}
