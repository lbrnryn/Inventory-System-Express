const express = require('express');
const router = express.Router();
const Unit = require('../.././models/unit');

router.get('/', async (req, res, next) => {
  try {
    const units = await Unit.find(req.query);
    res.json(units);
  } catch (err) { console.log(err.message) }
});

router.get('/', async (req, res, next) => {
  try {
    const unit = await Unit.findById(req.params.id);
    res.json(unit);
  } catch (err) { console.log(err.message) }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const unit = await Unit.findById(req.params.id);
    res.json(unit);
  } catch (err) { console.log(err.message) }
});


module.exports = router;
