import TopicList from "./TopicLink";
import { useState, useEffect } from "react";
import { postNewArticle } from "../../utils/api";

export default function NewArticle({ topicsList, activeUserName }) {
  const [newTitle, setNewTitle] = useState("");
  const [newArticleTopic, setNewArticleTopic] = useState("");
  const [newArticleImgUrl, setNewArticleImgUrl] = useState("");
  const [newArticleBody, setNewArticleBody] = useState("");

  const [isListed, setIslisted] = useState(false);
  const [errorPost, setErrorPost] = useState("");

  const postNewArticleHandler = (event) => {
    event.preventDefault();

    const newArticle = {
      title: newTitle,
      topic: newArticleTopic,
      author: activeUserName,
      body: newArticleBody,
      article_img_url: newArticleImgUrl,
    };
    postNewArticle(newArticle)
      .then((response) => {
        if (response.status === 201) {
          setIslisted(true);
          setNewTitle("");
          setNewArticleTopic("");
          setNewArticleImgUrl("");
          setNewArticleBody("");
        }
      })
      .catch((err) => {
        setErrorPost(err);
      });
  };

  return (
    <section className="newArtcileSection">
      <h2>Post new Article</h2>
      {errorPost ? <h3 className="errorDisplay">{errorPost}</h3> : null}
      {isListed ? (
        <div>
          {" "}
          <h3 className="item-listed">Article successfully listed!</h3>{" "}
        </div>
      ) : (
        <form className="newArticleForm" onSubmit={postNewArticleHandler}>
          <label className="newArticleLabel" htmlFor="title">
            Please add title of the article:*
          </label>
          <input
            className="inputAddArticle"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            type="text"
            id="title"
            placeholder="My new article..."
            required
          />
          <label className="newArticleLabel" htmlFor="">
            Select topic:
            <select
              className="newArticleSelect"
              value={newArticleTopic}
              onChange={(e) => setNewArticleTopic(e.target.value)}
              required
            >
              <option disabled value="">
                Choose ...
              </option>
              {topicsList.map((topic) => {
                return (
                  <option key={topic.slug} value={topic.slug}>
                    {topic.slug}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="newArticleLabel" htmlFor="imgUrl">
            Please add image URL:
          </label>
          <input
            className="inputAddArticle"
            value={newArticleImgUrl}
            onChange={(e) => setNewArticleImgUrl(e.target.value)}
            type="text"
            id="imgUrl"
            placeholder="https://"
          />
          <label className="newArticleLabel" htmlFor="textAreaArticle">
            Please type your article:
          </label>
          <textarea
            name="articleBody"
            value={newArticleBody}
            onChange={(e) => setNewArticleBody(e.target.value)}
            id="textAreaArticle"
            cols="30"
            rows="10"
            placeholder="This article is about..."
            required
          ></textarea>
          <button className="postArticleBtn">Post</button>
        </form>
      )}
    </section>
  );
}
