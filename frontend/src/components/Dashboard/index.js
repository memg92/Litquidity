import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIndexData } from "../../store/indices";
import { getStockData } from "../../store/stocks";
import DOW from "./Indices/DOW";
import NASDAQ from "./Indices/NASDAQ";
import SP500 from "./Indices/SP500";
import IndexNews from "./News/Indices";
import TrendingStocks from "./Stocks/TrendingStocks";
import "./Indices/Indices.css";
import "./News/News.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getIndexData())
      .then(() => dispatch(getStockData()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <h2 className="indices-message">Today's Markets</h2>
          <div className="indices-main-container">
            <SP500 />
            <NASDAQ />
            <DOW />
          </div>
          <div className="top-stocks-container">
            <h2 className="top-stocks-message">Today's Top Stocks</h2>
            <TrendingStocks trend="trending" />
            <TrendingStocks trend="gainers" />
            <TrendingStocks trend="losers" />
          </div>
          <IndexNews />
        </>
      )}
    </>
  );
};

export default Dashboard;
