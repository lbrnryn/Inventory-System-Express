const express = require('express');
const { getParts, addPart, getPart, updatePart, deletePart } = require('../controllers/partController');
const router = express.Router();

router
  .route('/')
  .get(getParts)
  .post(addPart);

router
  .route('/:id')
  .get(getPart)
  .put(updatePart)
  .delete(deletePart);

module.exports = router;
