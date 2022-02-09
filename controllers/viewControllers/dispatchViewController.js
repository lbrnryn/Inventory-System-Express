const Unit = require('../.././models/unit');
const Stock = require('../.././models/stock');
const Dispatch = require('../.././models/dispatch');
const { reduceStock } = require('../.././middleware');

// Get All Dispatches
exports.getDispatches = async (req, res, next) => {
  const units = await Unit.find().lean();
  const stocks = await Stock.find({ quantity: { $gt: 0 } }).lean();
  const dispatchesCount = await Dispatch.count();
  const dispatches = await Dispatch.find().lean();

  res.render('dispatches', { units, stocks, dispatches, dispatchesCount } );
}
