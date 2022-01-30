const express = require('express');
const { getStocks, addStock, getStock, deleteStock } = require('../controllers/stockController');
const router = express.Router();

router
  .route('/')
  .get(getStocks)
  .post(addStock);

router
  .route('/:id')
  .get(getStock)
  .delete(deleteStock);

module.exports = router;
