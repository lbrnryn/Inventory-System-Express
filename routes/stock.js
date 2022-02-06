const express = require('express');
const { getStocks, addStock, getStock, updateStock, deleteStock } = require('../controllers/stockController');
const router = express.Router();

router
  .route('/')
  .get(getStocks)
  .post(addStock);

router
  .route('/:id')
  // .get(getStock)
  .put(updateStock)
  .delete(deleteStock);

module.exports = router;
