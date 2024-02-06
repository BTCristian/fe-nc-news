import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/topics" className="nav-link">
            Topics
          </Link>
        </li>
      </ul>
    </nav>
  );
}
