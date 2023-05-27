const router = require("express").Router();
const Unit = require('../../models/unit');
const asyncHandler = require('../../asyncHandler');

// /api/units/:id
router.route('/:id')
  // Get a unit
  .get(asyncHandler(async (req, res) => {
    const unit = await Unit.findById(req.params.id);
    res.json(unit);
  }))
  // Updates a unit
  .put(asyncHandler(async (req, res) => {
    const updUnit = await Unit.findByIdAndUpdate(req.params.id, { plateNumber: req.body.plateNumber }, { new: true });
    res.json(updUnit);
  }))
  // Deletes a unit
  .delete(asyncHandler(async (req, res) => {
    await Unit.findByIdAndDelete(req.params.id);
  }))

// /api/units
router.route('/')
  // Get all units
  .get(asyncHandler(async (req, res) => {
    const units = await Unit.find(req.query);
    res.json(units);
  }))
  // Create a unit
  .post(asyncHandler(async (req, res) => {
    const { plateNumber } = req.body;
    const newUnit = await Unit.create({ plateNumber });
    res.json(newUnit);
  }))

module.exports = router;
