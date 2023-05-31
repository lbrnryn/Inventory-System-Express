const router = require("express").Router();
const Brand = require('../.././models/brand');
const asyncHandler = require('../../asyncHandler');

// /api/brands/:id
router.route('/:id')
  // Get brand
  .get(asyncHandler(async (req, res) => {
    const result = await Brand.findById(req.params.id);
    res.json(result);
  }))
  // Updates a brand
  .put(asyncHandler(async (req, res) => {
      const updBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updBrand);
  }))
  // Deletes a brand
  .delete(asyncHandler(async (req, res) => await Brand.findByIdAndDelete(req.params.id)))

// /api/brands - Create a brand
router.post('/', asyncHandler(async (req, res) => {
  const newBrand = await Brand.create(req.body);
  res.json(newBrand);
}));

module.exports = router;
