const express = require('express');
const Unit = require('../models/unit');
const Part = require('../models/part');
const Dispatch = require('../models/dispatch');
const router = express.Router();

// Units page - GET /units
router.get('/', async (req, res, next) => {
  try {
    const units = await Unit.find();
    units.forEach(unit => unit.url = `http://localhost:${process.env.PORT}/units/api/${unit._id}`);
    const dispatches = await Dispatch.find();
    res.render('units', { units });
  } catch (err) { console.log(err.message) }
});

// Add a unit - POST /units
router.post('/', async (req, res, next) => {
  try {
    const { plateNumber } = req.body;
    await Unit.create({ plateNumber });
    res.redirect('/');
  } catch (err) { console.log(err.message) }
});

// Edit a unit - PUT /units/:id
router.put('/:id', async (req, res, next) => {
  try {
    await Unit.findByIdAndUpdate({ _id: req.params.id }, { plateNumber: req.body.plateNumber });
    res.redirect('/');
  } catch (err) { console.log(err.message) }
});

// ----- API -----

// GET /units/api
router.get('/api', async (req, res, next) => {
  try {
    const units = await Unit.find(req.query);
    res.json(units);
  } catch (err) { console.log(err.message) }
});

// Get a unit - GET /units/api/:id
router.get('/api/:id', async (req, res, next) => {
  try {
    const unit = await Unit.findById(req.params.id);
    res.json(unit);
  } catch (err) { console.log(err.message) }
});

// DELETE /units/api/:id
router.delete('/api/:id', async (req, res, next) => {
  try {
    await Unit.findByIdAndDelete({ _id: req.params.id });
  } catch (err) { console.log(err.message) }
});

module.exports = router;
