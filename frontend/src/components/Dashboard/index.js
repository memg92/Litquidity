import { getIndexData } from "../../store/indices";
import { useDispatch } from "react-redux";
import SP500 from "./SP500";

const Dashboard = () => {
  const dispatch = useDispatch();

  dispatch(getIndexData());

  // const res = await fetch("/api/stocks", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ indexArray }),
  // });

  return <SP500 />;
  // return <h1>Hello</h1>;
};

export default Dashboard;
