const Stock = require('../../models/stock');

// Get All Stocks
exports.getStocks = async (req, res, next) => {
  const stocks = await Stock.find(req.query);
  res.json(stocks);
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

// Get Single Stock
exports.getStock = async (req, res, next) => {
  const result = await Stock.findById({ _id: req.params.id });
  res.json(result);
}

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
