const router = require("express").Router();
const Stock = require('../.././models/stock');
const Part = require('../.././models/part');
const asyncHandler = require('../../asyncHandler');

// /api/stocks/:id
router.route('/:id')
  .get(asyncHandler(async (req, res) => {
      const result = await Stock.findById({ _id: req.params.id }).populate('brand').populate('part');
      res.json(result);
  }))
  .put(asyncHandler(async (req, res) => {
    const { part, quantity, brand, price } = req.body;

    const foundPart = await Part.findOne({name: part, brand});

    const updStock = await Stock.findByIdAndUpdate(req.params.id, {
      brand,
      part: foundPart._id,
      quantity: quantity,
      price: price
    }, { new: true });

    const populatedUpdStock = await Stock.findById(updStock._id).populate('brand').populate('part');
    res.json(populatedUpdStock);
  }))
  .delete(asyncHandler(async (req, res) => await Stock.findByIdAndDelete(req.params.id)))

// /api/stocks
router.route('/')
  .get(asyncHandler(async (req, res) => {
    const stocks = await Stock.findById(req.params.id);
    res.json(stocks);
  }))
  .post(asyncHandler(async (req, res) => {
    const { part, quantity, brand, price } = req.body;

    const foundPart = await Part.findOne({name: part, brand});

    const newStock = await Stock.create({
      brand,
      part: foundPart._id,
      quantity: quantity,
      price: price
    });

    const populatedNewStock = await Stock.findById(newStock._id).populate('brand').populate('part');
    res.json(populatedNewStock);
  }))

module.exports = router;
