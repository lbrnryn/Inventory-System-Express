const router = require("express").Router();
const Brand = require('../.././models/brand');

// GET - /api/brands/:id
router.get('/:id', async (req, res, next) => {
  try {
    const result = await Brand.findById({ _id: req.params.id });
    res.json(result);
  } catch (err) { console.log(err.message) }
});

module.exports = router;
