// import { useDispatch } from "react-redux";
import { useState } from "react";
import { restoreCSRF, fetch } from "../../store/csrf";

const Dashboard = () => {
  // const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    // if (process.env.NODE_ENV !== "production") {
    //   restoreCSRF();
    // }
    const res = await fetch("http://localhost:8000/api/stocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchInput }),
    });

    const jsonObj = await res.json();
    console.log(jsonObj);
    return;
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        name="search"
        type="text"
        placeholder="Search for a stock..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Dashboard;
