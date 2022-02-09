const Unit = require('../.././models/unit');
const Part = require('../.././models/part');

// Get All Units
exports.getUnits = async (req, res, next) => {
  const units = await Unit.find().lean();
  const unitsCount = await Unit.count();
  const parts = await Part.find().lean();

  res.render('units', { units, unitsCount, parts });
}
