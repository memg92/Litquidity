import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink className="sign-up-button" to="/signup">
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <div className="navbar-container">
      <nav>
        <NavLink to="/" className="main-logo-name">
          Litquidity
        </NavLink>
        <ul>
          {/* <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li> */}
          <li>{isLoaded && sessionLinks}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
