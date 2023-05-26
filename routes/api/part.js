const express = require('express');
const router = express.Router();
const Part = require('../.././models/part');
const asyncHandler = require('../../asyncHandler');

// /api/parts/:id
router.route('/:id')
  // Get part
  .get(asyncHandler(async (req, res) => {
    const part = await Part.findById(req.params.id).populate('brand').lean();
    res.json(part);
  }))
  // Updates a part
  .put(asyncHandler(async (req, res) => {
    const updPart = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updPart);
  }))
  // Deletes a part
  .delete(asyncHandler(async (req, res) => {
    await Part.findByIdAndDelete(req.params.id);
  }))

// /api/parts
router.route('/')
  // // Get parts
  // .get(async (req, res, next) => {
  //   try {
  //     const parts = await Part.find(req.query).populate('brand');
  //     res.json(parts);
  //   } catch (err) { next(err) }
  // })
  // Create a part
  .post(asyncHandler(async (req, res, next) => {
    const newPart = await Part.create(req.body);
    res.json(newPart);
  }))

module.exports = router;
