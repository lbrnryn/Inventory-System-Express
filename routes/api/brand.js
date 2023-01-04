const express = require('express');
const router = express.Router();
const Brand = require('../.././models/brand');

// Get All Brands - GET /api/brands
router.get('/', async (req, res, next) => {
  try {
    const brands = await Brand.find(req.query);
    res.json(brands);
  } catch (err) { console.log(err.message) }
});

// Get Single Brand - /api/brands
router.get('/:id', async (req, res, next) => {
  try {
    const result = await Brand.findById({ _id: req.params.id });
    res.json(result);
  } catch (err) { console.log(err.message) }
});

// Delete a brand - DELETE /api/brands/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await Brand.findByIdAndDelete({ _id: req.params.id });
  } catch (err) { console.log(err.message) }
});

module.exports = router
