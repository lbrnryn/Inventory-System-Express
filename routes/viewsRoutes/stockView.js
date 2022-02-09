const express = require('express');
const { getStocks } = require('../.././controllers/viewControllers/stockViewController');
const router = express.Router();

router
  .route('/')
  .get(getStocks)

module.exports = router;
