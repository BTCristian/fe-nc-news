import { useEffect, useState } from "react";
import { getArticles } from "./api";
import ArticleCard from "./ArticleCard";
import "./ArticleList.css";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((articlesData) => {
      setArticles(articlesData);
    });
  }, []);

  return (
    <div>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
