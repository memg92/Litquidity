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
        <video
          src="/assets/looping-app-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          draggable="false"
          controlsList="nodownload nofullscreen noremoteplayback"
          className="splash-phone-video"
        ></video>

        <img
          src="/assets/splash-img.png"
          className="splash-phone-img"
          alt="phone-img"
        ></img>
      </div>
      <footer></footer>
    </div>
  );
};

export default SplashPage;
