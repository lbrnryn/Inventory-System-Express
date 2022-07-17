const express = require('express');
const router = express.Router();
const Unit = require('../models/unit');
const Stock = require('../models/stock');
const Dispatch = require('../models/dispatch');
const { reduceStock } = require('../middleware');

router.get('/', async (req, res, next) => {
  try {
    const units = await Unit.find();
    // const stocks = await Stock.find({ quantity: { $gt: 0 } });
    const stocks = await Stock.find();
    const dispatches = await Dispatch.find().populate('stock');
    // console.log(dispatches)

    res.render('dispatches', { units, stocks, dispatches } );
  } catch (err) { console.log(err.message) }
});

// Add Single Dispatch
router.post('/', async (req, res, next) => {
  try {
    const { plateNumber, stock } = req.body;
    await Dispatch.create({ plateNumber, stock });
    await Stock.findByIdAndUpdate({ _id: stock }, {
      $inc: { quantity: -1 }
    });
    res.redirect('/dispatches');
  } catch (err) { console.log(err.message) }
});

module.exports = router;
