const express = require("express");
// const { handleValidationErrors } = require("../../utils/validation");
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

const baseUrl = "https://sandbox.iexapis.com";
const apiTestKey = process.env.API_TEST_KEY;

router.post(
  "/stocks",
  asyncHandler(async (req, res, next) => {
    console.log("\n\n\n\n\n\nwe hit this\n\n\n\n\n\n");
    const { symbolQuery } = req.body.toUpperCase();
    const stockData = await fetch(
      `${baseUrl}/stock/${symbolQuery}/quote?token=${apiTestKey}`
    );
    if (stockData.ok) {
      console.log("\n\n\n\n\n\nfetch worked!\n\n\n\n\n");
      res.status(201).json({ stockData });
    } else {
      console.log("\n\n\n\n\ndid not work\n\n\n\n\n\n");
    }
  })
);

module.exports = router;
