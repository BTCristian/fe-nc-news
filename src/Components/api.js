import axios from "axios";
const ncNewsApi = axios.create({
  baseURL: "https://nc-news-cristian.onrender.com/",
});

export const getArticles = () => {
  return ncNewsApi
    .get("/api/articles")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const getArticleById = (article_id) => {
  return ncNewsApi
    .get(`/api/articles/${article_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const getCommentsByArticleId = (article_id) => {
  return ncNewsApi
    .get(`/api/articles/${article_id}/comments`)
    .then((res) => {
      return res.data.comments;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const voteArticle = (article_id, vote) => {
  return ncNewsApi
    .patch(`/api/articles/${article_id}`, { inc_votes: vote })
    .then((res) => {
      return res.data.article;
    })
    .catch((err) => {
      console.error("Error voting on article: ", err);
      throw err;
    });
};
