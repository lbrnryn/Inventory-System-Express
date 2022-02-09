const express = require('express');
const { getBrands } = require('../.././controllers/viewControllers/brandViewController');
const router = express.Router();

router
  .route('/')
  .get(getBrands) // Get All Brands

module.exports = router;
