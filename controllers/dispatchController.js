const Brand = require('../models/brand');
const Part = require('../models/part');
const Unit = require('../models/unit');
const Stock = require('../models/stock');
const Dispatch = require('../models/dispatch');
const { reduceStock } = require('../middleware');

// Get All Dispatches
exports.getDispatches = async (req, res, next) => {
  const brands = await Brand.find().lean();
  const units = await Unit.find().lean();
  const parts = await Part.find().populate('brand').lean();
  const stocks = await Stock.find({ quantity: { $gt: 0 } }).populate({ path: 'part', model: 'Part', populate: { path: 'brand', model: 'Brand' } }).lean();
  // const dispatches = await Dispatch.find().populate('unit').populate({ path: 'stock', model: 'Stock', populate: { path: 'part', model: 'Part', populate: { path: 'brand', model: 'Brand' } } }).lean();
  const dispatchesCount = await Dispatch.count();
  const dispatches = await Dispatch.find().lean();

  res.render('dispatches', { brands, units, stocks, dispatches, dispatchesCount } );
}

// Add Single Dispatch
exports.addDispatch = (req, res, next) => {
  const { unit, stock, quantity } = req.body;

  const dispatch = new Dispatch({
    unit: unit,
    stock: stock,
    quantity: quantity
  });

  dispatch.save((err, dispatch) => {
    if (err) { console.log(err.message); }
    console.log(dispatch);
    res.redirect('/dispatches');
  });
}

// Get Single Dispatch /dispatches/:id
exports.getDispatch = async (req, res, next) => {
  // console.log(req.params.id);
  const dispatch = await Dispatch.findById({ _id: req.params.id}).populate('unit').populate({ path: 'stock', model: 'Stock', populate: { path: 'part', model: 'Part', populate: { path: 'brand', model: 'Brand' } } });
  res.json(dispatch);
}

// Edit Single Dispatch
exports.updateDispatch = (req, res, next) => {
  // console.log(req.body.unit)
  const { unit, stock, quantity } = req.body;

  let dispatch = {
    unit: unit,
    stock: stock,
    quantity: quantity
  }

  Dispatch.findByIdAndUpdate({ _id: req.params.id }, dispatch, (err, dispatch) => {
    if (err) { console.log(err.message) }
    // console.log(dispatch);
    res.redirect('/dispatches');
  })
}
