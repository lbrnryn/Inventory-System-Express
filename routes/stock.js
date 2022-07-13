const express = require('express');
const router = express.Router();
const Part = require('../models/part');
const Stock = require('../models/stock');

// Get all stocks - GET /stocks
router.get('/', async (req, res, next) => {
  const parts = await Part.find().populate('brand');
  const stocks = await Stock.find().sort({ part: 'desc' });

  res.render('stocks', { parts, stocks });
})

module.exports = router;
