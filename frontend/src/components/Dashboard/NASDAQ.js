import { useSelector } from "react-redux";

const NASDAQ = () => {
  const indexData = useSelector((state) => state.indices);
  const nasdaqData = indexData.data.stockDataJSON.QQQ;

  const percentChange =
    parseFloat(nasdaqData.quote.changePercent).toFixed(2) + "%";

  return (
    <>
      <h3>Nasdaq</h3>
      <div>{percentChange > 0 ? "+" + percentChange : "-" + percentChange}</div>
    </>
  );
};

export default NASDAQ;
