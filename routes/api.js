const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');
const Part = require('../models/part');
const Stock = require('../models/stock');
const Dispatch = require('../models/dispatch');
const Unit = require('../models/unit');

router.get('/brands', async (req, res) => {
  const brands = await Brand.find(req.query);
  res.json(brands);
});

router.get('/parts', async (req, res) => {
  const parts = await Part.find(req.query);
  res.json(parts);
})

router.get('/stocks', async (req, res) => {
  const stocks = await Stock.find(req.query);
  res.json(stocks);
})

router.get('/dispatches', async (req, res) => {
  const dispatches = await Dispatch.find(req.query);
  res.json(dispatches);
})

router.get('/units', async (req, res) => {
  const units = await Unit.find(req.query);
  res.json(units);
})

module.exports = router;
