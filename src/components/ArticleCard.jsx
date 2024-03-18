import { Link } from "react-router-dom";
export default function ArticleCard({ article }) {
  let dateArr = article.created_at.split("T");

  return (
    <div className="articleCard">
      <img
        className="articleImg"
        src={article.article_img_url}
        alt={article.title}
      />
      <Link className="linkTitle" to={`/articles/${article.article_id}`}>
        {" "}
        <h2>{article.title}</h2>
      </Link>

      <div className="createdBlock">
        <Link className="linkAuthor" to={`/articles?author=${article.author}`}>
          Created by: <span className="spanNameAuthor">{article.author} </span>
        </Link>
        <p className="createdDate">{dateArr[0]}</p>
      </div>

      <div className="articleFooter">
        <Link
          className="articleTopicLink"
          to={`/articles?topic=${article.topic}`}
        >
          {article.topic}
        </Link>
        <div className="commentsLikesWrapper">
          <p>💬 Comments: {article.comment_count}</p>
          <div className="likesWrapper">
            {" "}
            <p>👍 {article.votes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
