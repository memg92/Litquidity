import { useSelector } from "react-redux";

const IndexNews = () => {
  const indexData = useSelector((state) => state.indices);
  const spyNews = indexData.data.stockDataJSON.SPY.news;

  return (
    <div className="index-news-container">
      <h2 className="index-news-title">Top Business News</h2>
      {spyNews.map((article, idx) => {
        return (
          <div className={`article-${idx}`} key={article.url}>
            <a href={article.url}>
              <h3 className="index-news-headline">{article.headline}</h3>
            </a>
            <p className="index-news-source">{article.source}</p>
            <p className="index-news-summary">
              {article.summary.length > 150
                ? article.summary.slice(0, 150).trim() + "... "
                : article.summary + " "}
              <a href={article.url}>Read More</a>
            </p>
            <img
              className="index-news-image"
              src={article.image}
              alt={article.source}
            />
          </div>
        );
      })}
    </div>
  );
};

export default IndexNews;
