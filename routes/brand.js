const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');

// Get all brands - GET /brands
router.get('/', async (req, res, next) => {
  try {
    const brands = await Brand.find().sort({ name: 'asc' }).lean();
    brands.forEach(brand => brand.url = `http://localhost:${process.env.PORT}/api/brands/${brand._id}`);
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

// Delete a brand - DELETE /brands/:id
// router.delete('/:id', async (req, res, next) => {
//   try {
//     // console.log(`Delete: ${req.params.id}`)
//     await Brand.findByIdAndDelete({ _id: req.params.id });
//     // res.redirect('/brands');
//   } catch (err) { console.log(err.message) }
// });

module.exports = router;
