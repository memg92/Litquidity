import { useSelector } from "react-redux";
import Dashboard from "../Dashboard";
import SplashPage from "../SplashPage";

const HomePageManager = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  const homePage = sessionUser ? <Dashboard /> : <SplashPage />;
  return homePage;
};

export default HomePageManager;
