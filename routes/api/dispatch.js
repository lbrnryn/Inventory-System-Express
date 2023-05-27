const express = require('express');
const router = express.Router();
const Dispatch = require('../.././models/dispatch');
const Stock = require('../.././models/stock');

// /api/dispatches/:id
router.route('/:id')
  .get(async (req, res, next) => {
    try {
      const dispatch = await Dispatch.findById(req.params.id);
      res.json(dispatch);
    } catch (err) { next(err) }
  })
  .put(async (req, res, next) => {
    const { unit, stock, quantity } = req.body;

    let dispatch = {
      unit: unit,
      stock: stock,
      quantity: quantity
    }
    Dispatch.findByIdAndUpdate(req.params.id, dispatch, (err, dispatch) => {
      if (err) { next(err) }
      res.redirect('/');
    })
  })

// /api/dispatches
router.route('/')
  .get(async (req, res, next) => {
    const dispatches = await Dispatch.find(req.query);
    res.json(dispatches);
  })
  .post(async (req, res, next) => {
    try {
      const newDispatch = await Dispatch.create(req.body);
      const updStock = await Stock.findByIdAndUpdate(newDispatch.stock, { $inc: { quantity: -1 } }, { new: true });

      const dispatch = await Dispatch.findById(newDispatch._id).populate('unit').populate('stock').lean();
      const stock = await Stock.findById(updStock._id).populate('brand').populate('part');

      res.json({ dispatch, stock });
    } catch (err) { next(err) }
  })

module.exports = router;
