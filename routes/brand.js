const express = require('express');
const { getBrands, addBrand, getBrand, updateBrand, deleteBrand } = require('../controllers/brandController');
const router = express.Router();

router
  .route('/')
  .get(getBrands) // Get All Brands
  .post(addBrand); // Add Single Brand

router
  .route('/:id')
  .get(getBrand) // Get Single Brand
  .put(updateBrand) // Edit Single Brand
  .delete(deleteBrand); // Delete Single Brand

module.exports = router;
