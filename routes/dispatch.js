const express = require('express');
const router = express.Router();
const Unit = require('../models/unit');
const Stock = require('../models/stock');
const Dispatch = require('../models/dispatch');
const { reduceStock } = require('../middleware');

// Add Single Dispatch
router.post('/', async (req, res, next) => {
  try {
    const { plateNumber, stock } = req.body;
    await Dispatch.create({ plateNumber, stock });
    await Stock.findByIdAndUpdate({ _id: stock }, {
      $inc: { quantity: -1 }
    });
    res.redirect('/');
  } catch (err) { console.log(err.message) }
});

module.exports = router;
