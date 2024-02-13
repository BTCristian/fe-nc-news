import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTopics, getArticles } from "./api";
import ArticleList from "./ArticleList";
import "./Topic.css";

export default function Topic() {
  const { topic } = useParams();
  const initialTopic = topic !== ":topic" ? topic : "all";
  console.log("Initial topic: ", initialTopic);
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(initialTopic);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getTopics()
      .then((topicsData) => {
        setTopics(topicsData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading topics: ", err);
        setIsLoading(false);
        setIsError(true);
      });

    setIsLoading(true);
    if (initialTopic === "all") {
      getArticles()
        .then((articlesData) => {
          setArticles(articlesData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error loading articles: ", err);
          setIsLoading(false);
          setIsError(true);
        });
    } else {
      getArticles(initialTopic)
        .then((articlesData) => {
          setArticles(articlesData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error loading articles: ", err);
          setIsLoading(false);
          setIsError(true);
        });
    }
  }, [initialTopic, currentTopic]);

  const handleTopicChange = (selectedTopic) => {
    setCurrentTopic(selectedTopic);
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
    <div className="topics">
      <h2>Please select a topic</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              to={`/topics/${topic.slug}`}
              onClick={() => handleTopicChange(topic.slug)}
              className={
                currentTopic === topic.slug ? "topic-link active" : "topic-link"
              }
            >
              {topic.slug}
            </Link>
          </li>
        ))}
      </ul>
      <ArticleList articles={articles} />
    </div>
  );
}
