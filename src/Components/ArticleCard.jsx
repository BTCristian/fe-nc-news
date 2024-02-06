import "./ArticleCard.css";

export default function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      {article.article_img_url && (
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-image"
        />
      )}

      <p>Author: {article.author}</p>
      <p>Published: {new Date(article.created_at).toLocaleDateString()}</p>
      <button className="vote-button">Vote ({article.votes})</button>
      <button className="show-comments-button">
        Show Comments ({article.comment_count})
      </button>
    </div>
  );
}
