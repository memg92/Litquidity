// import { useDispatch } from "react-redux";
import { useState } from "react";

const SearchBar = () => {
  // const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/stocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchInput }),
    });

    const stockData = res.data.stockDataJSON;
    return;
  };

  return (
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
  );
};

export default SearchBar;
