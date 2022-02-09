const express = require('express');
const router = express.Router();
const Brand = require('../.././models/brand');
const { getBrands, addBrand, getBrand, updateBrand, deleteBrand } = require('../.././controllers/apiControllers/brandAPIController');

router
  .route('/')
  .get(getBrands) // Get All Brands
  .post(addBrand) // Add Brand

router
  .route('/:id')
  .get(getBrand) // Get Brand
  .put(updateBrand) // Update Brand
  .delete(deleteBrand) // Delete Brand

module.exports = router
