import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ArticleManager from "./ArticleManager";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Nav from "./Nav";
import NewArticle from "./NewArticle";
import SingleArticleManager from "./SingleArticleManager";

function App() {
  const [topicsList, setTopicsList] = useState([]);
  const [activeUserName, setActiveUserName] = useState("grumpy19");
  const [isError, setIsError] = useState(null);

  return (
    <>
      <Nav
        setTopicsList={setTopicsList}
        topicsList={topicsList}
        activeUserName={activeUserName}
      />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home setIsError={setIsError} />} />
          <Route path="/articles" element={<ArticleManager />} />
          <Route
            path="/new-article"
            element={
              <NewArticle
                topicsList={topicsList}
                activeUserName={activeUserName}
              />
            }
          />
          <Route
            path="/articles/:id"
            element={
              <SingleArticleManager
                activeUserName={activeUserName}
                isError={isError}
                setIsError={setIsError}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
