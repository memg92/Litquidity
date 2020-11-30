import StockNews from "../Dashboard/News/Stock";
import { useDispatch, useSelector } from "react-redux";
import { getUserPortfolios } from "../../store/portfolios";
import { useState, useEffect } from "react";
import { fetch } from "../../store/csrf";
import "../Dashboard/News/News.css";
import "./StockDetails.css";
import { useHistory } from "react-router-dom";

const StockDetails = (props) => {
  const stock = props.location.state.stock;
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  // const [stockCreated, setStockCreated] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const portfolios = useSelector(
    (state) => state.portfolios.portfolios.portfolios
  );

  const openMenu = () => {
    if (showMenu) return;

    dispatch(getUserPortfolios(userId)).then(() => setShowMenu(true));
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    document
      .querySelector(".select-portfolio-form")
      .addEventListener("click", (event) => {
        event.stopPropagation();
      });
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const select = document.querySelector(".select-portfolio");
    const symbol = stock.symbol;
    const portfolioId = select.value;
    const quantity = 1;
    const priceAcquired = stock.latestPrice;
    const dateAcquired = new Date();
    const res = await fetch("/api/stocks/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol,
        quantity,
        priceAcquired,
        dateAcquired,
        portfolioId,
      }),
    });

    if (res.ok) {
      // setStockCreated(true);
      history.push(`/portfolios/${portfolioId}`);
    }
  };

  return (
    <>
      <div className="stock-details-container">
        <h2 className="stock-name-symbol">{`${stock.companyName} (${stock.symbol})`}</h2>
        <p className="stock-price">{`$${stock.latestPrice}`}</p>
        <p className="stock-change-details">{`$${stock.change} (${parseFloat(
          stock.changePercent * 100
        ).toFixed(2)}%)`}</p>
        <button onClick={openMenu}>Add to portfolio</button>
        {showMenu && (
          <form className="select-portfolio-form" onSubmit={handleSubmit}>
            <label>Please select a portfolio</label>
            <select className="select-portfolio" name="portfolios">
              {portfolios.map((portfolio) => (
                <option
                  key={portfolio.id}
                  name={portfolio.id}
                  value={portfolio.id}
                >
                  {portfolio.title}
                </option>
              ))}
            </select>
            <button type="submit">Add Stock</button>
          </form>
        )}
      </div>
      <StockNews symbol={stock.symbol} />
    </>
  );
};

export default StockDetails;
