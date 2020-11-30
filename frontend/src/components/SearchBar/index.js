// import { useDispatch } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";
// import StockDetails from "../StockDetails/StockDetailPage";

const SearchBar = () => {
  // const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [stockLoaded, setStockLaoded] = useState(false);
  const [stock, setStock] = useState({});
  const handleSearch = async (e) => {
    e.preventDefault();
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
    <>
      <form onSubmit={handleSearch}>
        <i className="fas fa-search"></i>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          name="search"
          className="search-bar"
          type="text"
          placeholder="Search for a stock..."
        />
      </form>
      {stockLoaded && (
        <Redirect
          push
          to={{
            pathname: `/stocks/${stock.symbol}`,
            state: { stock: stock },
          }}
        />
      )}
    </>
  );
};

export default SearchBar;
