import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import SearchBar from "../SearchBar";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="search-bar-container">
          <SearchBar />
        </div>
        <NavLink className="portfolio-link" to="/portfolio">
          Portfolio
        </NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <ul className="unauthed-nav-container">
        <li>
          <NavLink to="/login">Log In</NavLink>
        </li>
        <li>
          <NavLink className="sign-up-button" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <div className="navbar-container">
      <nav>
        <NavLink to="/" className="main-logo-name">
          Litquidity
        </NavLink>
        {isLoaded && sessionLinks}
      </nav>
    </div>
  );
};

export default Navigation;
