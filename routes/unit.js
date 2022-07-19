const express = require('express');
const Unit = require('../models/unit');
const Part = require('../models/part');
const Dispatch = require('../models/dispatch');
const router = express.Router();

// Get all units - GET /units
router.get('/', async (req, res, next) => {
  try {
    const units = await Unit.find();
    units.forEach(unit => unit.url = `http://localhost:${process.env.PORT}/api/units/${unit._id}`);
    const dispatches = await Dispatch.find();
    console.log(dispatches)
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

// Edit a unit - PUT /units/:id
router.put('/:id', async (req, res, next) => {
  try {
    await Unit.findByIdAndUpdate({ _id: req.params.id }, { plateNumber: req.body.plateNumber });
    res.redirect('/units');
  } catch (err) { console.log(err.message) }
});

// Delete a unit - DELETE /units/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await Unit.findByIdAndDelete({ _id: req.params.id });
    res.redirect('/units');
  } catch (err) { console.log(err.message) }
});

module.exports = router;
