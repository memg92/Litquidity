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
const keyword = process.env.NODE_ENV === "production" ? "cloud" : "sandbox";
const baseUrl = `https://${keyword}.iexapis.com/stable/stock`;
const apiTestKey = process.env.API_TEST_KEY;

/******************** Stock routes ********************/

//route for users to search for a single stock using search feature
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    let symbolQuery;
    let url;
    if (req.body.searchInput) {
      symbolQuery = req.body.searchInput;
      url = `${baseUrl}/${symbolQuery}/quote?token=${apiTestKey}`;
    }
    if (req.body.indexArray) {
      symbolQuery = req.body.indexArray;
      symbolsString = symbolQuery.join();
      url = `${baseUrl}/market/batch?symbols=${symbolsString}&types=quote,news&token=${apiTestKey}`;
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

module.exports = router;
