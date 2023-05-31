const express = require('express');
const router = express.Router();
const Dispatch = require('../.././models/dispatch');
const Stock = require('../.././models/stock');
const asyncHandler = require('../../asyncHandler');

// /api/dispatches/:id
router.route('/:id')
  .get(asyncHandler(async (req, res) => {
    const dispatch = await Dispatch.findById(req.params.id).populate('unit').populate('stock');
    res.json(dispatch);
  }))
  .put(asyncHandler(async (req, res) => {
    const updDispatch = await Dispatch.findByIdAndUpdate(req.params.id, req.body, { new: true });

    const dispatch = await Dispatch.findById(updDispatch._id).populate('unit').populate('stock');

    const stock = await Stock.findById(dispatch.stock._id).populate('brand').populate('part');
    
    dispatch.stock.brand = stock.brand;
    dispatch.stock.part = stock.part;
    res.json(dispatch);
  }))
  .delete(asyncHandler(async (req, res) => await Dispatch.findByIdAndDelete(req.params.id)))

// /api/dispatches
router.route('/')
  .get(asyncHandler(async (req, res) => {
    // const dispatches = await Dispatch.find(req.query).populate('unit').populate('stock');
    // res.json(dispatches);
    console.log(req.query);
  }))
  .post(asyncHandler(async (req, res) => {
    const newDispatch = await Dispatch.create(req.body);
    const updStock = await Stock.findByIdAndUpdate(newDispatch.stock, { $inc: { quantity: -1 } }, { new: true });

    const dispatch = await Dispatch.findById(newDispatch._id).populate('unit').populate('stock');
    const stock = await Stock.findById(updStock._id).populate('brand').populate('part');

    res.json({ dispatch, stock });
  }))

module.exports = router;
