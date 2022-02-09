const express = require('express');
const router = express.Router();
const Unit = require('../.././models/unit');
const { getUnits, addUnit, getUnit, deleteUnit } = require('../.././controllers/apiControllers/unitAPIController');

router
  .route('/')
  .get(getUnits)
  .post(addUnit)

router
  .route('/:id')
  .get(getUnit)
  .delete(deleteUnit)

module.exports = router;
