import { NavLink } from "react-router-dom";
import "./SplashPage.css";

const SplashPage = () => {
  return (
    <div className="splash-main-container">
      <div className="splash-text-container">
        <h1>Investing for Everyone</h1>
        <h3>
          Litquidity, a pioneer of commission-free investing, gives you more
          ways to make your money work harder.
        </h3>
        <NavLink className="signup-button" to="/signup">
          Sign Up!
        </NavLink>
      </div>
      <div className="splash-media-container">
        <img src="../../../../public/assets/splash-phone.png"></img>
      </div>
    </div>
  );
};

export default SplashPage;
