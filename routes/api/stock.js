const express = require('express');
const router = express.Router();
const Stock = require('../.././models/stock');
const Brand = require('../.././models/brand');
const Part = require('../.././models/part');

// /api/stocks/:id
router.route('/:id')
  .get(async (req, res, next) => {
    try {
      const result = await Stock.findById({ _id: req.params.id }).populate('brand').populate('part');
      res.json(result);
    } catch (err) { next(err) }
  })
  .put(async (req, res, next) => {
    try {
        const { part, quantity, brand, price } = req.body;

        const foundPart = await Part.findOne({name: part, brand});

        const updStock = await Stock.findByIdAndUpdate(req.params.id, {
          brand,
          part: foundPart._id,
          quantity: quantity,
          price: price
        }, { new: true });

        // console.log(updStock);
        // res.json(updStock);
        const populatedUpdStock = await Stock.findById(updStock._id).populate('brand').populate('part');
        res.json(populatedUpdStock);

        // let stock = {
        //   part: {
        //       name: partname,
        //       brand: brandname
        //   },
        //   quantity: quantity,
        //   price: price
        // };
        // await Stock.findByIdAndUpdate({ _id: req.params.id }, stock);

        // console.log(req.params.id);
        // res.json(req.body);
    } catch (err) { next(err) }
  })
  .delete(async (req, res, next) => {
    try {
        await Stock.findByIdAndDelete(req.params.id);
    } catch (err) { next(err) }
  })

// /api/stocks
router.route('/')
  .get(async (req, res, next) => {
    try {
      const stocks = await Stock.findById(req.params.id);
      res.json(stocks);
    } catch (err) { next(err) }
  })
  .post(async (req, res, next) => {
    try {
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

    } catch (err) { next(err) }
  })

module.exports = router;
