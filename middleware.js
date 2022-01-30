const Stock = require('./models/stock');

exports.reduceStock = async function(req, res, next) {
  let quantity = Number(`-${req.body.quantity}`);
  // console.log(quantity);
  // console.log(typeof quantity);
  await Stock.findByIdAndUpdate({ _id: req.body.stock }, { $inc: { quantity: quantity } });
  next()
}
