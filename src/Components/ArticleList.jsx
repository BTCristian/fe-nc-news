import { useEffect, useState } from "react";
import { sortArticles } from "./utils";
import { getArticles } from "./api";
import { Link, useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import "./ArticleList.css";

export default function ArticleList({ topic }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sortOption, setSortOption] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    const sortOptionFromUrl = searchParams.get("sort_by");
    const sortOrderFromUrl = searchParams.get("order");

    getArticles(topic)
      .then((articlesData) => {
        if (sortOptionFromUrl && sortOrderFromUrl) {
          const sortedArticles = sortArticles(
            articlesData,
            sortOptionFromUrl,
            sortOrderFromUrl
          );
          setArticles(sortedArticles);
        } else {
          setArticles(articlesData);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setIsLoading(false);
        setIsError(true);
      });
  }, [topic, searchParams]);

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);

    const sortedArticles = sortArticles(articles, selectedOption, sortOrder);
    setArticles(sortedArticles);

    setSearchParams({ sort_by: selectedOption, order: sortOrder });
  };

  const toggleOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    const sortedArticles = sortArticles(articles, sortOption, newOrder);
    setArticles(sortedArticles);

    setSearchParams({ sort_by: sortOption, order: newOrder });
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
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
        <p>Error loading articles. Please try again later</p>
        <img
          src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
          alt="404 error image"
        />
      </div>
    );
  }

  return (
    <section className="main-section">
      <div className="sorting-dropdown">
        <select value={sortOption} onChange={handleSortChange}>
          <option value="date">Sort by Date</option>
          <option value="comment_count">Sort by Comment Count</option>
          <option value="votes">Sort by Votes</option>
        </select>
        <button onClick={toggleOrder} className="order-button">
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                <ArticleCard article={article} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
