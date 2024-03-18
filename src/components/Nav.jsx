import { Link } from "react-router-dom";
import axios from "axios";
import TopicList from "./TopicLink";
import { useEffect } from "react";

export default function Nav({ topicsList, setTopicsList, activeUserName }) {
  useEffect(() => {
    axios
      .get("https://nc-news-24h6.onrender.com/api/topics")
      .then((response) => {
        setTopicsList(response.data.topics);
      });
  }, []);

  return (
    <nav>
      <ul>
        <div className="leftbar">
          <li>
            <Link className="linkItem" to="/">
              Home
            </Link>
          </li>
          <div className="dropdown">
            <li className="linkItem">Topics</li>
            <div className="dropdownContent">
              {topicsList.map((topic) => {
                return <TopicList key={topic.slug} topic={topic} />;
              })}
            </div>
          </div>
          <li>
            <Link className="linkItem" to="/new-article">
              {" "}
              Add New Article{" "}
            </Link>
          </li>
        </div>
        <div className="rightbar">
          <p className="userActive">{activeUserName}</p>
        </div>
      </ul>
    </nav>
  );
}
