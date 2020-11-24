const express = require("express");
// const { handleValidationErrors } = require("../../utils/validation");
const asyncHandler = require("express-async-handler");
const fetch = require("node-fetch");
const router = express.Router();

// const validateSearch = [
//   check("search")
//     .exists({ checkFalsy: true })
//     .withMessage("Please provide a valid email.")
//     .isLength({ max: 6 })
//     .withMessage("Please provide a username with at least 4 characters."),
//   handleValidationErrors,
// ];

const baseUrl = "https://sandbox.iexapis.com/stable/stock";
const apiTestKey = process.env.API_TEST_KEY;

/******************** Stock routes ********************/

//route for users to search for a single stock using search feature
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { searchInput: symbolQuery } = req.body;
    console.log("\n\n\n\n\n\n", symbolQuery, "\n\n\n\n\n\n");

    let url;
    if (symbolQuery.length > 5) {
      let symbolsString = symbolQuery;
      if (Array.isArray(symbolQuery)) {
        symbolsString = symbolQuery.join();
      }
      url = `${baseUrl}/market/batch?symbols=${symbolsString}&types=quote,news&token=${apiTestKey}`;
    } else {
      url = `${baseUrl}/${symbolQuery}/quote?token=${apiTestKey}`;
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

module.exports = router;
