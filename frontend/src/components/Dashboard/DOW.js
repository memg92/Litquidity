import { useSelector } from "react-redux";

const DOW = () => {
  const indexData = useSelector((state) => state.indices);
  const dowData = indexData.data.stockDataJSON.DIA;

  const percentChange =
    parseFloat(dowData.quote.changePercent).toFixed(2) + "%";

  return (
    <div className="index-main-container">
      <h3>Dow</h3>
      <div>{percentChange > 0 ? "+" + percentChange : "-" + percentChange}</div>
    </div>
  );
};

export default DOW;
