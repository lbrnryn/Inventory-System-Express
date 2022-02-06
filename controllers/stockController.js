const Part = require('../models/part');
const Stock = require('../models/stock');

// Get All Stocks
exports.getStocks = async (req, res, next) => {
  const parts = await Part.find().populate('brand').lean();
  const stocks = await Stock.find().sort({ part: 'desc' }).lean();
  const stocksCount = await Stock.count();

  res.render('stocks', { parts, stocks, stocksCount });
}

// Add Single Stock
exports.addStock = (req, res, next) => {
  const { part, quantity, price } = req.body;

  const stock = new Stock({
    part: part,
    quantity: quantity,
    price: price
  });

  stock.save((err, stock) => {
    if (err) { console.log(err.message) }
    // console.log(stock)
    res.redirect('/stocks');
  });
}

// // Get Single Stock
// exports.getStock = async (req, res, next) => {
//   // console.log(req.params.id);
//   const result = await Stock.findById({ _id: req.params.id }).lean();
//   res.json(result);
// }

exports.updateStock = (req, res, next) => {
  const { part, quantity, price } = req.body;

  let stock = {
    part: part,
    quantity: quantity,
    price: price
  };

  Stock.findByIdAndUpdate({ _id: req.params.id }, stock, (err, stock) => {
    if (err) { console.log(err.message) }
    // console.log(stock);
    res.redirect('/stocks');
  });
}

// Delete Single Stock
exports.deleteStock = async (req, res, next) => {
  await Stock.findByIdAndDelete({ _id: req.params.id });
  res.json({ msg: 'Stock deleted...' })
}
