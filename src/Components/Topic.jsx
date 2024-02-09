import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTopics, getArticles } from "./api";
import ArticleList from "./ArticleList";
import "./Topic.css";

export default function Topic() {
  const { topic: initialTopic } = useParams();
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(initialTopic || "");
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

    if (currentTopic) {
      setIsLoading(true);
      getArticles(currentTopic)
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
      setIsLoading(true);
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
    }
  }, [currentTopic]);

  const handleTopicChange = (selectedTopic) => {
    setCurrentTopic(selectedTopic);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading articles. Please try again later</div>;
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
      <ArticleList topic={currentTopic} />
    </div>
  );
}
