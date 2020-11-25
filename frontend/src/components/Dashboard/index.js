import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIndexData } from "../../store/indices";
import DOW from "./DOW";
import NASDAQ from "./NASDAQ";
import SP500 from "./SP500";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getIndexData()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div className="indices-main-container">
          <SP500 />
          <NASDAQ />
          <DOW />
        </div>
      )}
    </>
  );
};

export default Dashboard;
