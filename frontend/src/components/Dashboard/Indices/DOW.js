import { useSelector } from "react-redux";

const DOW = () => {
  const indexData = useSelector((state) => state.indices);
  const dowData = indexData.data.stockDataJSON.DIA;

  const percentChange =
    parseFloat(dowData.quote.changePercent * 100).toFixed(2) + "%";
  const percentPositive = dowData.quote.changePercent > 0;
  const percentStyle = percentPositive ? { color: "green" } : { color: "red" };

  return (
    <div className="index-main-container">
      <h3>Dow</h3>
      <div style={percentStyle}>
        {percentPositive ? "+" + percentChange : percentChange}
      </div>
    </div>
  );
};

export default DOW;
