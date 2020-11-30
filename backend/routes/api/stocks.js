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

    // console.log("\n\n\n\n\n\n", symbolQuery, "\n\n\n\n\n\n");

    const stockData = await fetch(url);

    const stockDataJSON = await stockData.json();
    if (stockData.ok) {
      return res.status(201).send({ stockDataJSON });
    } else {
      next(stockData.statusText);
    }
  })
);

router.post(
  "/news",
  asyncHandler(async (req, res, next) => {
    let symbol = req.body.symbol;
    let url = `${baseUrl}/${symbol}/news?token=${apiKey}`;

    // console.log("\n\n\n\n\n\n", symbolQuery, "\n\n\n\n\n\n");

    const stockNews = await fetch(url);

    const stockNewsJSON = await stockNews.json();
    if (stockNews.ok) {
      return res.status(201).send({ stockNewsJSON });
    } else {
      next(stockNews.statusText);
    }
  })
);

router.post(
  "/create",
  asyncHandler(async (req, res, next) => {
    console.log("\n\n\n\nwe hit create route\n\n\n\n");
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

module.exports = router;
