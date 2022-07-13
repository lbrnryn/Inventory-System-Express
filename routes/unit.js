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

    const parts = await Part.find();
    res.render('units', { units, parts });
  } catch (err) { console.log(err.message) }
});

// Add a unit - POST /units
router.post('/', async (req, res, next) => {
  try {
    const { unitname } = req.body;
    await Unit.create({ name: unitname });
    res.redirect('/units');
  } catch (err) { console.log(err.message) }
});

module.exports = router;
