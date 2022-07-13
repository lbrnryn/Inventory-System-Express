const express = require('express');
const router = express.Router();
const Part = require('../models/part');
const Brand = require('../models/brand');

// Get All Parts - GET /parts
router.get('/', async (req, res, next) => {
  try {
    const brands = await Brand.find();
    const parts = await Part.find();
    res.render('parts', { parts, brands });
  } catch (err) { console.log(err.message) }
})

module.exports = router;
