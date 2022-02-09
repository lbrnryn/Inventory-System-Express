const express = require('express');
const { getDispatches } = require('../.././controllers/viewControllers/dispatchViewController');
const router = express.Router();

router
  .route('/')
  .get(getDispatches)

module.exports = router;
