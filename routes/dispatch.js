const express = require('express');
const { getDispatches, addDispatch, getDispatch, updateDispatch } = require('../controllers/dispatchController');
const router = express.Router();

router
  .route('/')
  .get(getDispatches)
  .post(addDispatch);

router
  .route('/:id')
  // .get(getDispatch)
  // .put(updateDispatch);

module.exports = router;
