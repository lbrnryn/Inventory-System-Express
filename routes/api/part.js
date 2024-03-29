const router = require("express").Router();
const Part = require('../.././models/part');
const asyncHandler = require('../../asyncHandler');

// /api/parts/:id
router.route('/:id')
  // Get part
  .get(asyncHandler(async (req, res) => {
    const part = await Part.findById(req.params.id).populate('brand');
    res.json(part);
  }))
  // Updates a part
  .put(asyncHandler(async (req, res) => {
    const updPart = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updPart);
  }))
  // Deletes a part
  .delete(asyncHandler(async (req, res) => await Part.findByIdAndDelete(req.params.id)))

// /api/parts
router.route('/')
  // Get parts
  .get(asyncHandler(async (req, res, next) => {
    const parts = await Part.find(req.query).populate('brand');
    res.json(parts);
  }))
  // Create a part
  .post(asyncHandler(async (req, res, next) => {
    const newPart = await Part.create(req.body);
    res.json(newPart);
  }))

module.exports = router;
