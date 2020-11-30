import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPortfolios } from "../../../store/portfolios";
import Portfolio from "./Portfolio";
import "./Portfolios.css";

const PortfoliosPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserPortfolios(sessionUser.id)).then(() => setIsLoaded(true));
  }, [dispatch]);
  return <Portfolio isLoaded={isLoaded} />;
};

export default PortfoliosPage;
