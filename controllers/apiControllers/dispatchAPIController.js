const Dispatch = require('../.././models/dispatch');

// Get All Dispatches
exports.getDispatches = async (req, res, next) => {
  const dispatches = await Dispatch.find(req.query);
  res.json(dispatches);
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
  const dispatch = await Dispatch.findById({ _id: req.params.id});
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
  // console.log(dispatch)
  Dispatch.findByIdAndUpdate({ _id: req.params.id }, dispatch, (err, dispatch) => {
    if (err) { console.log(err.message) }
    // console.log(dispatch);
    res.redirect('/dispatches');
  })
}
