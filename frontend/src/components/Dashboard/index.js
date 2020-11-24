// import { useDispatch } from "react-redux";
import { useState } from "react";
import { restoreCSRF, fetch } from "../../store/csrf";
import Cookies from "js-cookie";

const Dashboard = () => {
  // const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (process.env.NODE_ENV !== "production") {
      restoreCSRF();
    }
    const res = await fetch("/api/stocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchInput }),
      // "XSRF-Token": Cookies.get("XSRF-TOKEN"),
    });

    const jsonObj = await res.json();
    console.log(jsonObj);
    return;
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="search-bar-container">
        <i className="fas fa-search"></i>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          name="search"
          className="search-bar"
          type="text"
          placeholder="Search for a stock..."
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Dashboard;
