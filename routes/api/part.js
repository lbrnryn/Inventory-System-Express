const express = require('express');
const router = express.Router();
const Part = require('../.././models/part');

// Get All Parts - GET /api/parts
router.get('/', async (req, res, next) => {
  try {
    const parts = await Part.find(req.query).populate('brand');
    res.json(parts);
  } catch (err) { console.log(err.message) }
});

router.get('/:id', async (req, res, next) => {
  try {
    const part = await Part.findById({ _id: req.params.id }).populate('brand').lean();
    res.json(part);
  } catch (err) { console.log(err.message) }
});

module.exports = router;
