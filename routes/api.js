const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');
const Dispatch = require('../models/dispatch');

router.get('/brands', async (req, res) => {
  // console.log(typeof req.query.name)
  const brands = await Brand.find(req.query);
  // const brands = await Brand.find();
  res.json(brands)
});

router.get('/dispatches', async (req, res) => {
  const dispatches = await Dispatch.find(req.query);
  res.json(dispatches)
})

module.exports = router;
