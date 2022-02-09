const Part = require('../.././models/part');
const Brand = require('../.././models/brand');

// Get All Parts
exports.getParts = async (req, res, next) => {
  const brands = await Brand.find().lean();
  const parts = await Part.find().lean();
  const partsCount = await Part.count();

  res.render('parts', { parts, partsCount, brands });
}
