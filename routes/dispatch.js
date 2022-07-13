const express = require('express');
const router = express.Router();
const Unit = require('../models/unit');
const Stock = require('../models/stock');
const Dispatch = require('../models/dispatch');
const { reduceStock } = require('../middleware');

router.get('/', async (req, res, next) => {
  try {
    const units = await Unit.find();
    const stocks = await Stock.find({ quantity: { $gt: 0 } });
    const dispatches = await Dispatch.find();

    res.render('dispatches', { units, stocks, dispatches } );
  } catch (err) { console.log(err.message) }
})

module.exports = router;
