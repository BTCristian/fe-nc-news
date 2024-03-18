import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { getAllArticles } from "../../utils/api";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

export default function ArticleManager() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");
  const authorQuery = searchParams.get("author");

  const [direction, setDirection] = useState("desc");
  const [sortField, setSortField] = useState("null");
  const [isError, setIsError] = useState(null);

  // Setting direction asc/deesc
  const onDirectionChange = (e) => {
    setDirection(e.target.value);
  };
  const setDirectionOrder = (e) => {
    onDirectionChange(e);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };

  // sorting desc
  const sortBasedOnKey = (sortKey, directKey) => {
    const array = [...articleList];
    if (directKey === "asc") {
      return array.sort((a, b) => {
        let x = a[sortKey];
        let y = b[sortKey];
        return x - y;
      });
    } else {
      return array.sort((a, b) => {
        let x = a[sortKey];
        let y = b[sortKey];
        return y - x;
      });
    }
  };
  const handleSortChange = (e) => {
    let userResponse = e.target.value;
    const userResponseArr = userResponse.split("-");
    let sortKey = userResponseArr[0];
    let directKey = userResponseArr[1];

    if (sortKey !== "null") {
      setSortField(sortKey);
      let sortedData = sortBasedOnKey(sortKey, directKey);
      setArticleList(sortedData);
    }
  };

  useEffect(() => {
    getAllArticles(topicQuery, authorQuery, direction)
      .then((response) => {
        setArticleList(response.data.articles);
        setIsloading(false);
      })
      .catch((error) => {
        setIsError({ error });
      });
  }, [searchParams]);

  if (isError) {
    return (
      <div className="isError">
        <p>Error loading articles. Please try again later</p>
        <img
          src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
          alt="404 error image"
        />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="isLoading">
        <p>Loading...</p>
        <img
          src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1259.gif"
          alt="loading animation"
        />
      </div>
    );
  }

  return (
    <main>
      <div className="sortnavbar">
        <div className="directionWrapper">
          <h3>Show articles:</h3>
          <div className="directionInputsWrapper">
            <label htmlFor="asc">From new to old</label>
            <input
              className="radio"
              type="radio"
              name="direction"
              value="desc"
              id="desc"
              checked={direction === "desc"}
              onChange={setDirectionOrder}
            />

            <label className="labelDirection" htmlFor="asc">
              From old to new
            </label>
            <input
              className="radio"
              type="radio"
              name="direction"
              value="asc"
              id="asc"
              checked={direction === "asc"}
              onChange={setDirectionOrder}
            />
          </div>
        </div>
        <div className="sortByWrapper">
          <h3 className="sortByItem">Sort by...</h3>

          <select
            value={sortField}
            onChange={handleSortChange}
            id="list-sorting"
          >
            <option value={"null"}>Choose ...</option>
            <option value="comment_count-desc">
              By comment count: High to Low
            </option>
            <option value="votes-desc">By votes: High to Low</option>
            <option value="comment_count-asc">
              By comment count: Low to High
            </option>
            <option value="votes-asc">By votes: Low to High</option>
          </select>
        </div>
      </div>

      <section className="allArticles">
        {articleList.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </section>
    </main>
  );
}
