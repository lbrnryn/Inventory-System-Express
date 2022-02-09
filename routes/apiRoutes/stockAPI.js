const express = require('express');
const router = express.Router();
const Stock = require('../.././models/stock');
const { getStocks, addStock, getStock, updateStock, deleteStock } = require('../.././controllers/apiControllers/stockAPIController');

router
  .route('/')
  .get(getStocks)
  .post(addStock)

router
  .route('/:id')
  .get(getStock)
  .put(updateStock)
  .delete(deleteStock)
  
module.exports = router;
