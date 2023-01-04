const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');

// Brands page - GET /brands
router.get('/', async (req, res, next) => {
  try {
    const brands = await Brand.find().sort({ name: 'asc' }).lean();
    brands.forEach(brand => brand.url = `http://localhost:${process.env.PORT}/brands/api/${brand._id}`);
    res.render('brands', { brands });
  } catch (err) { console.log(err.message) }
});

// Add a brand - POST /brands
router.post('/', async (req, res, next) => {
  try {
    const nameExist = await Brand.findOne({ name: req.body.brandname });
    if (nameExist) {
      console.log('Name is already exist');
      res.redirect('/brands');
      return;
    }
    await Brand.create({ name: req.body.brandname });
    res.redirect('/brands');
  } catch (err) { console.log(err.message) }
});

// Edit a Brand - PUT /brands/:id
router.put('/:id', async (req, res, next) => {
  try {
    await Brand.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.brandname });
    res.redirect('/brands');
  } catch (err) { console.log(err.message) }
});

// ----- API -----

// Get All Brands - GET /brands/api
router.get('/', async (req, res, next) => {
  try {
    const brands = await Brand.find(req.query);
    res.json(brands);
  } catch (err) { console.log(err.message) }
});

// Get Single Brand - /brands/api/:id
router.get('/api/:id', async (req, res, next) => {
  try {
    const result = await Brand.findById({ _id: req.params.id });
    res.json(result);
  } catch (err) { console.log(err.message) }
});

// Delete a brand - DELETE /brands/api/:id
router.delete('/api/:id', async (req, res, next) => {
  try {
    await Brand.findByIdAndDelete({ _id: req.params.id });
  } catch (err) { console.log(err.message) }
});

module.exports = router;
