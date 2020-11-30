import { useSelector } from "react-redux";

const NASDAQ = () => {
  const indexData = useSelector((state) => state.indices);
  const nasdaqData = indexData.data.stockDataJSON.QQQ;

  const percentChange =
    parseFloat(nasdaqData.quote.changePercent * 100).toFixed(2) + "%";
  const percentPositive = nasdaqData.quote.changePercent > 0;
  const percentStyle = percentPositive ? { color: "green" } : { color: "red" };

  return (
    <div className="index-main-container">
      <h3>Nasdaq</h3>
      <div style={percentStyle}>
        {percentPositive ? "+" + percentChange : percentChange}
      </div>
    </div>
  );
};

export default NASDAQ;
