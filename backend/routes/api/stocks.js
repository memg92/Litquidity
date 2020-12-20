const express = require("express");
// const { handleValidationErrors } = require("../../utils/validation");
const fetch = require("node-fetch");
const { Stock } = require("../../db/models");
const asyncHandler = require("express-async-handler");
const router = express.Router();

// const validateSearch = [
//   check("search")
//     .exists({ checkFalsy: true })
//     .withMessage("Please provide a valid email.")
//     .isLength({ max: 6 })
//     .withMessage("Please provide a username with at least 4 characters."),
//   handleValidationErrors,
// ];
const keyword = process.env.NODE_ENV === "production" ? "cloud" : "sandbox";
const baseUrl = `https://${keyword}.iexapis.com/stable/stock`;
const apiKey =
  process.env.NODE_ENV === "production"
    ? process.env.API_PROD_KEY
    : process.env.API_TEST_KEY;

/******************** Stock routes ********************/

//route to load stocks related to a specific portfolio id
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const portfolioId = parseInt(req.params.id, 10);

    const stocks = await Stock.findAll({ where: { portfolioId } });
    if (stocks) {
      res.status(201).json({ stocks });
    } else {
      next();
    }
  })
);

//route for users to search for a single stock using search feature
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    let symbolQuery;
    let url;
    if (req.body.searchInput) {
      symbolQuery = req.body.searchInput;
      url = `${baseUrl}/${symbolQuery}/quote?token=${apiKey}`;
    }
    if (req.body.indexArray) {
      symbolQuery = req.body.indexArray;
      symbolsString = symbolQuery.join();
      url = `${baseUrl}/market/batch?symbols=${symbolsString}&types=quote,news&token=${apiKey}`;
    }

    const stockData = await fetch(url);

    const stockDataJSON = await stockData.json();
    if (stockData.ok) {
      return res.status(201).send({ stockDataJSON });
    } else {
      next(stockData.statusText);
    }
  })
);

//route to add stock to a portfolio
router.post(
  "/create",
  asyncHandler(async (req, res, next) => {
    const {
      symbol,
      quantity,
      priceAcquired,
      dateAcquired,
      portfolioId,
    } = req.body;

    const stock = await Stock.create({
      symbol,
      quantity,
      priceAcquired,
      dateAcquired,
      portfolioId,
    });
    if (stock) {
      res.status(201).json({ stock });
    } else {
      next();
    }
  })
);

//route to get a list of stocks based on trend type
router.get(
  "/trend",
  asyncHandler(async (req, res, next) => {
    let listLimit = "5";

    let mostActiveUrl = `${baseUrl}/market/list/mostactive?listLimit=${listLimit}&token=${apiKey}`;

    let gainersUrl = `${baseUrl}/market/list/gainers?listLimit=${listLimit}&token=${apiKey}`;

    let losersUrl = `${baseUrl}/market/list/losers?listLimit=${listLimit}&token=${apiKey}`;

    const mostActiveStocks = await fetch(mostActiveUrl);
    const gainersStocks = await fetch(gainersUrl);
    const losersStocks = await fetch(losersUrl);

    if (mostActiveStocks.ok && gainersStocks.ok && losersStocks.ok) {
      const mostActiveStocksJSON = await mostActiveStocks.json();
      const gainersStocksJSON = await gainersStocks.json();
      const losersStocksJSON = await losersStocks.json();

      return res
        .status(201)
        .send({ mostActiveStocksJSON, gainersStocksJSON, losersStocksJSON });
    } else {
      next(res.data.errors);
    }
  })
);

//route to get stock-related news
router.post(
  "/news",
  asyncHandler(async (req, res, next) => {
    let symbol = req.body.symbol;
    let url = `${baseUrl}/${symbol}/news?token=${apiKey}`;

    const stockNews = await fetch(url);

    const stockNewsJSON = await stockNews.json();
    if (stockNews.ok) {
      return res.status(201).send({ stockNewsJSON });
    } else {
      next(stockNews.statusText);
    }
  })
);

module.exports = router;
