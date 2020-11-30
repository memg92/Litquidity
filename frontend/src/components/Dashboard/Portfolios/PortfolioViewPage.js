import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetch } from "../../../store/csrf";

const PortfolioViewPage = () => {
  const params = useParams();
  const portfolioId = params.id;
  console.log("portfolioId", portfolioId);
  const [stocks, setStocks] = useState({});
  const [stocksLoaded, setStocksLoaded] = useState(false);
  // console.log(symbol);

  useEffect(() => {
    const fetchStocks = async () => {
      const res = await fetch(`/api/stocks/${portfolioId}`);

      if (res.ok) {
        // const stock = res.data.stockDataJSON;
        setStocks(res.data.stocks);
        setStocksLoaded(true);
      } else {
        console.error("SYMBOL WAS NOT VALID");
        throw res;
      }
    };
    fetchStocks();
  }, [portfolioId]);

  const formatDate = (date) => {
    const newDate = new Date(date).toISOString().slice(0, 10);
    return newDate;
  };

  return (
    <>
      {stocksLoaded && (
        <table>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price Acquired</th>
            <th>Date Acquired</th>
          </tr>
          {stocks.map((stock) => {
            return (
              <tr>
                <td>{stock.symbol}</td>
                <td>{stock.quantity}</td>
                <td>{`$${stock.priceAcquired}`}</td>
                <td>{formatDate(stock.dateAcquired)}</td>
              </tr>
            );
          })}
        </table>
      )}
    </>
  );
};

export default PortfolioViewPage;
