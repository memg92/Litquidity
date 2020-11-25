import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIndexData } from "../../store/indices";
import DOW from "./Indices/DOW";
import NASDAQ from "./Indices/NASDAQ";
import SP500 from "./Indices/SP500";
import IndexNews from "./News/Indices";
import "./Indices/Indices.css";
import "./News/News.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getIndexData()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <div className="indices-main-container">
            <SP500 />
            <NASDAQ />
            <DOW />
          </div>
          <IndexNews />
        </>
      )}
    </>
  );
};

export default Dashboard;
