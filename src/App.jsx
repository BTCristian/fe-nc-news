import Header from "./Components/Header";
import Home from "./Components/Home";
import ArticleDetails from "./Components/ArticleDetails";
import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:article_id" element={<ArticleDetails />} />
      </Routes>
    </div>
  );
}

export default App;
