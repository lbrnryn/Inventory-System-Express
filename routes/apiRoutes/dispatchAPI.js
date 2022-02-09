const express = require('express');
const router = express.Router();
const Dispatch = require('../.././models/dispatch');
const { getDispatches, addDispatch, getDispatch, updateDispatch } = require('../.././controllers/apiControllers/dispatchAPIController');

router
  .route('/')
  .get(getDispatches) // Get All Dispatches
  .post(addDispatch) // Add Dispatch

router
  .route('/:id')
  .get(getDispatch) // Get Dispatch
  .put(updateDispatch) // Update Dispatch

module.exports = router;
