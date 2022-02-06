const express = require('express');
const { getUnits, addUnit, deleteUnit } = require('../controllers/unitController');
const router = express.Router();

router
  .route('/')
  .get(getUnits)
  .post(addUnit);

router
  .route('/:id')
  // .get(getUnit)
  .delete(deleteUnit);

module.exports = router;
