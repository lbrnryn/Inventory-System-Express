const express = require('express');
const { getParts, addPart, getPart, updatePart, deletePart, getPartRecord } = require('../controllers/partController');
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

router
  .route('/records/:partname')
  .get(getPartRecord);

module.exports = router;
