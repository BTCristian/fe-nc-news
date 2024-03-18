import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleArticleCard from "./SingleArticleCard";
import { getArticleById } from "../../utils/api";
import ErrorPage from "./ErrorPage";

export default function SingleArticleManager({ activeUserName }) {
  const [voteArticle, setVoteArticle] = useState(null);
  const [article, setArticle] = useState({});
  const [err, setErr] = useState(null);
  const [formatedDate, setFormatedDate] = useState();
  const { id } = useParams();
  useEffect(() => {
    getArticleById(id)
      .then((response) => {
        setArticle(response.data.article);
        setVoteArticle(response.data.article.votes);
        let dateVal = response.data.article.created_at;
        let dateArr = dateVal.split("T");
        setFormatedDate(dateArr[0]);
      })
      .catch((error) => {
        setErr(error.response);
      });
  }, []);

  if (err) {
    return <ErrorPage err={err} />;
  }
  return (
    <section>
      <SingleArticleCard
        article={article}
        activeUserName={activeUserName}
        id={id}
        voteArticle={voteArticle}
        setVoteArticle={setVoteArticle}
        date={formatedDate}
      />
    </section>
  );
}
