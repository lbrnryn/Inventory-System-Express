const express = require('express');
const router = express.Router();
const Dispatch = require('../.././models/dispatch');

// Get All Dispatches
router.get('/', async (req, res, next) => {
  const dispatches = await Dispatch.find(req.query);
  res.json(dispatches);
});

// Add Single Dispatch
router.post('/', async (req, res, next) => {
  try {
    const { unit, stock, quantity } = req.body;

    const dispatch = new Dispatch({
      unit: unit,
      stock: stock,
      quantity: quantity
    });

    dispatch.save((err, dispatch) => {
      if (err) { console.log(err.message); }
      res.redirect('/dispatches');
    });
  } catch (err) { console.log(err.message) }
});

// Get Single Dispatch /dispatches/:id
router.get('/:id', async (req, res, next) => {
  try {
    const dispatch = await Dispatch.findById({ _id: req.params.id});
    res.json(dispatch);
  } catch (err) { console.log(err.message) }
});

// Edit Single Dispatch
router.put('/:id', async (req, res, next) => {
  const { unit, stock, quantity } = req.body;

  let dispatch = {
    unit: unit,
    stock: stock,
    quantity: quantity
  }
  Dispatch.findByIdAndUpdate({ _id: req.params.id }, dispatch, (err, dispatch) => {
    if (err) { console.log(err.message) }
    res.redirect('/dispatches');
  })
});

module.exports = router;
