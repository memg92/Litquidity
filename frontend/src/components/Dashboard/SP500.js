import { useSelector } from "react-redux";

const SP500 = () => {
  const indexData = useSelector((state) => state.indices);
  const spyData = indexData.data.stockDataJSON.SPY;

  const percentChange =
    parseFloat(spyData.quote.changePercent).toFixed(2) + "%";

  return (
    <div className="index-main-container">
      <h3>S&amp;P 500</h3>
      <div>{percentChange > 0 ? "+" + percentChange : "-" + percentChange}</div>
    </div>
  );
};

export default SP500;
