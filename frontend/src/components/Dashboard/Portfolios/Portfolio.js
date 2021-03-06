import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserPortfolio,
  getUserPortfolios,
} from "../../../store/portfolios";

const Portfolio = ({ isLoaded }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [portfolioTitle, setPortfolioTitle] = useState("");
  const portfolios = useSelector((state) => state.portfolios.portfolios);
  const userId = useSelector((state) => state.session.user.id);

  const openForm = () => {
    if (showForm) return;
    setShowForm(true);
  };

  useEffect(() => {
    if (!showForm) return;
    const closeForm = () => {
      setShowForm(false);
    };
    document.addEventListener("click", closeForm);
    document
      .querySelector(".create-portfolio-form")
      .addEventListener("click", (event) => {
        event.stopPropagation();
      });
    return () => document.removeEventListener("click", closeForm);
  }, [showForm]);

  const createPortfolio = async (e) => {
    e.preventDefault();
    // debugger;
    setShowForm(false);
    return dispatch(createUserPortfolio(userId, portfolioTitle)).then(() =>
      dispatch(getUserPortfolios(userId))
    );
  };

  const displayPortfolios = ({ portfolios }) => {
    // debugger;
    // console.log(portfolios);

    if (!portfolios) {
      return <h2>Loading...</h2>;
    }

    if (portfolios.length) {
      return portfolios.map((portfolio, idx) => {
        return (
          <div
            key={portfolio.id}
            className={`portfolio-container portfolio-${idx}`}
          >
            <h3 className="portfolio-title">{portfolio.title}</h3>
            <a
              href={`/portfolios/${portfolio.id}/stocks`}
              className="portfolio-view-link"
            >
              View Portfolio
            </a>
          </div>
        );
      });
    }

    return (
      <div className="create-portfolio-container">
        <div>Click below to create a portfolio!</div>
        <button onClick={openForm} className="create-portfolio-button">
          Create a Portfolio
        </button>
        {showForm && (
          <form className="create-portfolio-form" onSubmit={createPortfolio}>
            <input
              id="create-portfolio-title"
              type="text"
              placeholder="Type in a title..."
              onChange={(e) => setPortfolioTitle(e.target.value)}
              required
            />
            <button type="submit" className="create-portfolio-button__submit">
              Submit Title
            </button>
          </form>
        )}
      </div>
    );
  };

  return <>{isLoaded && displayPortfolios(portfolios)}</>;
};

export default Portfolio;
