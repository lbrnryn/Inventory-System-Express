const express = require('express');
const router = express.Router();
const Part = require('../.././models/part');

// Get All Parts
router.get('/', async (req, res, next) => {
  try {
    const parts = await Part.find(req.query);
    res.json(parts);
  } catch (err) { console.log(err.message) }
});

// Add Single Part
router.post('/', async (req, res, next) => {
  try {
    const { partname, brandname } = req.body;

    const part = new Part({
      name: partname,
      brand: brandname,
    });

    part.save((err, part) => {
      if (err) { console.log(err.message); }
      // console.log(part)
      res.redirect('/parts');
    })
  } catch (err) { console.log(err.message) }
});

router.get('/:id', async (req, res, next) => {
  try {
    const part = await Part.findById({ _id: req.params.id }).populate('brand').lean();
    res.json(part);
  } catch (err) { console.log(err.message) }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { partname, brandname } = req.body;

    let part = {
      name: partname,
      brand: brandname
    }

    Part.findByIdAndUpdate({ _id: req.params.id }, part, (err) => {
      if (err) { console.log(err.message) }
      res.redirect('/parts');
    });
  } catch (err) { console.log(err.message) }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Part.findByIdAndDelete({ _id: req.params.id });
    res.json({ msg: 'Part deleted...'})
  } catch (err) { console.log(err.message) }
});

module.exports = router;
