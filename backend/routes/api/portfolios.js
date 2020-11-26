const express = require("express");
const jwt = require("jsonwebtoken");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const asyncHandler = require("express-async-handler");
// const fetch = require("node-fetch");
const router = express.Router();
const { Portfolio } = require("../../db/models");

const validatePortfolio = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid title.")
    .isLength({ max: 15 })
    .withMessage("Please provide a title with less than 16 characters."),
  handleValidationErrors,
];

/******************** Portfolio routes ********************/

//route to get portfolios
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);

    const portfolios = await Portfolio.findAll({ where: userId });

    res.json({ portfolios });
  })
);

//route to create portfolios
router.post(
  "/",
  validatePortfolio,
  asyncHandler(async (req, res, next) => {
    const { title, userId } = req.body;
    const portfolio = await Portfolio.create({
      userId,
      title,
    });

    res.status(201).json({ portfolio });
  })
);

module.exports = router;
