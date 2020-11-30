import React, { useEffect, useState } from "react";
import { fetch } from "../../../store/csrf";

const StockNews = ({ symbol }) => {
  const [stockNews, setStockNews] = useState([]);
  const [newsLoaded, setNewsLoaded] = useState(false);
  // console.log(symbol);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch("/api/stocks/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol }),
      });

      if (res.ok) {
        // const stock = res.data.stockDataJSON;
        setStockNews(res.data.stockNewsJSON);
        setNewsLoaded(true);
      } else {
        console.error("SYMBOL WAS NOT VALID");
        throw res;
      }
    };
    fetchNews();
  }, [symbol]);

  return (
    newsLoaded && (
      <div className="stock-news-container">
        <h2 className="stock-news-title">Latest News</h2>
        {stockNews.map((article, idx) => {
          return (
            <div className={`article-${idx}`} key={article.url}>
              <a href={article.url}>
                <h3 className="stock-news-headline">{article.headline}</h3>
              </a>
              <p className="stock-news-source">{article.source}</p>
              <p className="stock-news-summary">
                {article.summary.length > 150
                  ? article.summary.slice(0, 150).trim() + "... "
                  : article.summary + " "}
                <a href={article.url}>Read More</a>
              </p>
              <img
                className="stock-news-image"
                src={article.image}
                alt={article.source}
              />
            </div>
          );
        })}
      </div>
    )
  );
};

export default StockNews;
