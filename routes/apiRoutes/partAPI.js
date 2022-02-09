const express = require('express');
const router = express.Router();
const Part = require('../.././models/part');
const { getParts, addPart, getPart, updatePart, deletePart } = require('../.././controllers/apiControllers/partAPIController');

router
  .route('/')
  .get(getParts) // Get Parts
  .post(addPart) // Add Part

router
  .route('/:id')
  .get(getPart) // Get Part
  .put(updatePart) // Update Part
  .delete(deletePart) // Delete Part

module.exports = router;
