import axios from "axios";

// ARTICLES
export const getAllArticles = (topicQuery, authorQuery, direction) => {
  return axios.get("https://nc-news-cristian.onrender.com/api/articles", {
    params: { topic: topicQuery, author: authorQuery, order: direction },
  });
};

export const getArticleById = (id) => {
  return axios.get(`https://nc-news-cristian.onrender.com/api/articles/${id}`);
};
export const updateVotesForArticleById = (id, votes) => {
  return axios.patch(
    `https://nc-news-cristian.onrender.com/api/articles/${id}`,
    votes
  );
};
export const postNewArticle = (newArticle) => {
  return axios.post(
    `https://nc-news-cristian.onrender.com/api/articles`,
    // add extra / if not working here       ^^^
    newArticle
  );
};

// COMMENTS
export const getCommentsByArticleId = (id) => {
  return axios.get(
    `https://nc-news-cristian.onrender.com/api/articles/${id}/comments`
  );
};

export const postComment = (id, msg) => {
  return axios.post(
    `https://nc-news-cristian.onrender.com/api/articles/${id}/comments`,
    msg
  );
};

export const deleteCommentById = (idComment) => {
  return axios.delete(
    `https://nc-news-cristian.onrender.com/api/comments/${idComment}`
  );
};

export const updateCommentVotes = (commentId, votes) => {
  return axios.patch(
    `https://nc-news-cristian.onrender.com/api/comments/${commentId}`,
    votes
  );
};
