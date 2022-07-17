const express = require('express');
const router = express.Router();
const Part = require('../models/part');
const Brand = require('../models/brand');

// Get All Parts - GET /parts
router.get('/', async (req, res, next) => {
  try {
    const brands = await Brand.find();
    const parts = await Part.find().populate('brand').lean();
    parts.forEach(part => part.url = `http://localhost:${process.env.PORT}/api/parts/${part._id}`);
    // console.log(parts)
    res.render('parts', { parts, brands });
  } catch (err) { console.log(err.message) }
});

// Add Single Part - PORT /parts
router.post('/', async (req, res, next) => {
  try {
    const nameExist = await Part.findOne({ name: req.body.partname, brand: req.body.brandname });
    if (nameExist) {
      console.log('Part is already exist');
      res.redirect('/parts');
      return;
    }
    await Part.create({ name: req.body.partname, brand: req.body.brandname });
    res.redirect('/parts');
  } catch (err) { console.log(err.message) }
});

// Edit a part - PUT /parts/:id
router.put('/:id', async (req, res, next) => {
  try {
    await Part.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.partname, brand: req.body.brandname });
    res.redirect('/parts');
  } catch (err) { console.log(err.message) }
});

// Delete a brand - DELETE /parts/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await Part.findByIdAndDelete({ _id: req.params.id });
    res.redirect('/parts');
  } catch (err) { console.log(err.message) }
});

module.exports = router;
