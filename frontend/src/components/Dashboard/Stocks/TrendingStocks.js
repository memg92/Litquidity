import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetch } from "../../../store/csrf";
import "../News/News.css";
import "./TrendingStocks.css";

const TrendingStocks = (props) => {
  const stockData = useSelector((state) => state.stocks);

  const [searchInput, setSearchInput] = useState("");
  const [stockLoaded, setStockLaoded] = useState(false);
  const [stock, setStock] = useState({});
  let trendData;
  if (props.trend === "trending") {
    trendData = stockData.data.mostActiveStocksJSON;
  } else if (props.trend === "gainers") {
    trendData = stockData.data.gainersStocksJSON;
  } else if (props.trend === "losers") {
    trendData = stockData.data.losersStocksJSON;
  }

  const handleClick = async (symbol) => {
    setSearchInput(symbol);
    // console.log(searchInput);
    const res = await fetch("/api/stocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchInput }),
    });

    if (res.ok) {
      // const stock = res.data.stockDataJSON;
      setStock(res.data.stockDataJSON);
      // console.log("we hit this", stock);
      setStockLaoded(true);
    } else {
      console.error("SYMBOL WAS NOT VALID");
      throw res;
    }
  };

  return (
    <div className="trending-stocks-container">
      <h2 className="trending-stocks-title">
        {`Top ${props.trend[0].toUpperCase() + props.trend.slice(1)}`}
      </h2>
      {console.log(trendData)}
      <ul className="trending-stocks-list">
        {trendData.map((stock) => {
          return (
            <li
              className="stock-container"
              onClick={(e) => handleClick(stock.symbol)}
            >
              <div className="stock-symbol">{stock.symbol}</div>
              <div className="stock-price">{`$${stock.latestPrice}`}</div>
              <div className="stock-change">
                {`${parseFloat(stock.changePercent * 100).toFixed(2)}%`}
              </div>
            </li>
          );
        })}
      </ul>
      {stockLoaded && (
        <Redirect
          push
          to={{
            pathname: `/stocks/${stock.symbol}`,
            state: { stock: stock },
          }}
        />
      )}
    </div>
  );
};

export default TrendingStocks;
