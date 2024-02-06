import Header from "./Components/Header";
import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
