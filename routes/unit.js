const express = require('express');
const Unit = require('../models/unit');
const Part = require('../models/part');
const router = express.Router();

// Get all units - GET /units
router.get('/', async (req, res, next) => {
  try {
    const units = await Unit.find();
    units.forEach((unit) => {
      const { _id } = unit;
      unit.url = `http://localhost:${process.env.PORT}/api/units/${_id}`;
    });
    res.render('units', { units });
  } catch (err) { console.log(err.message) }
});

// Add a unit - POST /units
router.post('/', async (req, res, next) => {
  try {
    const { plateNumber } = req.body;
    await Unit.create({ plateNumber });
    res.redirect('/units');
  } catch (err) { console.log(err.message) }
});

module.exports = router;
