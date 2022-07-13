const express = require('express');
const router = express.Router();
const Stock = require('../.././models/stock');

router.get('/', async (req, res, next) => {
  try {
    const stocks = await Stock.find(req.query);
    res.json(stocks);
  } catch (err) { console.log(err.message) }
});

router.post('/', async (req, res, next) => {
  try {
    const { part, quantity, price } = req.body;

    const stock = new Stock({
      part: part,
      quantity: quantity,
      price: price
    });

    stock.save((err, stock) => {
      if (err) { console.log(err.message) }
      // console.log(stock)
      res.redirect('/stocks');
    });
  } catch (err) { console.log(err.message) }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await Stock.findById({ _id: req.params.id });
    res.json(result);
  } catch (err) { console.log(err.message) }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { part, quantity, price } = req.body;

    let stock = {
      part: part,
      quantity: quantity,
      price: price
    };

    Stock.findByIdAndUpdate({ _id: req.params.id }, stock, (err, stock) => {
      if (err) { console.log(err.message) }
      // console.log(stock);
      res.redirect('/stocks');
    });
  } catch (err) { console.log(err.message) }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Stock.findByIdAndDelete({ _id: req.params.id });
    res.json({ msg: 'Stock deleted...' })
  } catch (err) { console.log(err.message) }
})

module.exports = router;
