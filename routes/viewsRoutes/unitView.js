const express = require('express');
const { getUnits } = require('../.././controllers/viewControllers/unitViewController');
const router = express.Router();

router
  .route('/')
  .get(getUnits)

module.exports = router;
