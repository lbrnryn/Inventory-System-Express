const express = require('express');
const router = express.Router();
const Stock = require('../.././models/stock');

router.get('/', async (req, res, next) => {
  try {
    const stocks = await Stock.find(req.query);
    res.json(stocks);
  } catch (err) { console.log(err.message) }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await Stock.findById({ _id: req.params.id }).populate('part');
    res.json(result);
  } catch (err) { console.log(err.message) }
});

module.exports = router;
