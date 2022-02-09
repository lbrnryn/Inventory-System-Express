const Brand = require('../.././models/brand');

// Get All Brands
exports.getBrands = async (req, res, next) => {
  const brands = await Brand.find().sort({ name: 'asc' }).lean();
  const brandsCount = await Brand.count();

  res.render('brands', { brands, brandsCount });
  // res.json(brands)
}
