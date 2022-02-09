const express = require('express');
const { getParts } = require('../.././controllers/viewControllers/partViewController');
const router = express.Router();

router
  .route('/')
  .get(getParts)

module.exports = router;
