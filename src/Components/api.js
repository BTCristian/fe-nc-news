import axios from "axios";
const ncNewsApi = axios.create({
  baseURL: "https://nc-news-cristian.onrender.com/",
});

export const getArticles = () => {
  return ncNewsApi.get("/api/articles").then((res) => {
    return res.data;
  });
};
