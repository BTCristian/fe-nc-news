import ArticleList from "./ArticleList";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to Northcoders News</h2>
      <ArticleList />
    </div>
  );
}
