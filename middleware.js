const Stock = require('./models/stock');

exports.reduceStock = async function(req, res, next) {
  let quantity = Number(`-${req.body.quantity}`);
  await Stock.findByIdAndUpdate({ _id: req.body.stock }, { $inc: { quantity: quantity } });
  next()
}
