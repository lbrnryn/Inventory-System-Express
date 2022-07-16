const express = require('express');
const router = express.Router();
const Part = require('../models/part');
const Stock = require('../models/stock');

// Get all stocks - GET /stocks
router.get('/', async (req, res, next) => {
  const parts = await Part.find().populate('brand').lean();
  const stocks = await Stock.find().populate('part').lean();
  stocks.forEach(stock => stock.url = `http://localhost:${process.env.PORT}/api/stocks/${stock._id}`);
  // console.log(parts)
  res.render('stocks', { parts, stocks });
});

// Add a stock - POST /stocks
router.post('/', async (req, res, next) => {
  try {
    const { partname, brandname, quantity, price } = req.body;
    await Stock.create({
      // part: partname,
      part: {
        name: partname,
        brand: brandname
      },
      quantity: quantity,
      price: price
    });
    res.redirect('/stocks');
  } catch (err) { console.log(err.message) }
});

// Edit a stock - PUT /stocks/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { partname, brandname, quantity, price } = req.body;
    let stock = {
      part: {
        name: partname,
        brand: brandname
      },
      quantity: quantity,
      price: price
    };
    await Stock.findByIdAndUpdate({ _id: req.params.id }, stock);
    res.redirect('/stocks');
  } catch (err) { console.log(err.message) }
});

// Delete a stock - DELETE /stocks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await Stock.findByIdAndDelete({ _id: req.params.id });
    res.redirect('/stocks');
  } catch (err) { console.log(err.message) }
});

module.exports = router;
