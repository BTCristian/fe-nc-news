import Header from "./Components/Header";
import Home from "./Components/Home";
import ArticleDetails from "./Components/ArticleDetails";
import { Route, Routes } from "react-router-dom";
import Topic from "./Components/Topic";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:article_id" element={<ArticleDetails />} />
        <Route path="/topics/*" element={<Topic />} />
      </Routes>
    </div>
  );
}

export default App;
