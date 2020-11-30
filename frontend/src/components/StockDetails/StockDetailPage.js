import StockNews from "../Dashboard/News/Stock";
import { useDispatch, useSelector } from "react-redux";
import { getUserPortfolios } from "../../store/portfolios";
import { useState, useEffect } from "react";
import { fetch } from "../../store/csrf";

const StockDetails = (props) => {
  const stock = props.location.state.stock;
  const [showMenu, setShowMenu] = useState(false);
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
      // console.log(res, "stock was created");
    }
  };
  // console.log(stock);
  return (
    <>
      <h1>{`${stock.companyName} (${stock.symbol})`}</h1>
      <p>{`$${stock.latestPrice}`}</p>
      <p>{`$${stock.change} (${parseFloat(stock.changePercent).toFixed(
        2
      )}%)`}</p>
      <button onClick={openMenu}>Add to portfolio</button>
      {showMenu && (
        <form className="select-portfolio-form">
          <label>Please select a portfolio</label>
          <select className="select-portfolio" name="portfolios">
            {portfolios.map((portfolio) => (
              <option name={portfolio.id} value={portfolio.id}>
                {portfolio.title}
              </option>
            ))}
          </select>
          <button type="submit" onClick={handleSubmit}>
            Add Stock
          </button>
        </form>
      )}
      <StockNews symbol={stock.symbol} />
    </>
  );
};

export default StockDetails;
