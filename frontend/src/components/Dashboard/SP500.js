import { useSelector } from "react-redux";

const SP500 = () => {
  const indexData = useSelector((state) => state.indices);
  console.log(indexData);
  return (
    <div>
      <div>S&amp;P 500</div>
    </div>
  );
};

export default SP500;
