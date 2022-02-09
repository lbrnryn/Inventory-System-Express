const Part = require('../.././models/part');
const Stock = require('../.././models/stock');

// Get All Stocks
exports.getStocks = async (req, res, next) => {
  const parts = await Part.find().populate('brand').lean();
  const stocks = await Stock.find().sort({ part: 'desc' }).lean();
  const stocksCount = await Stock.count();

  res.render('stocks', { parts, stocks, stocksCount });
}
