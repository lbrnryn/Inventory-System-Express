const Unit = require('../models/unit');
const Part = require('../models/part');
const Dispatch = require('../models/dispatch');

// Get All Units
exports.getUnits = async (req, res, next) => {
  const units = await Unit.find().lean();
  const unitsCount = await Unit.count();
  const parts = await Part.find().lean();

  res.render('units', { units, unitsCount, parts });
}

// Add Single Unit
exports.addUnit = (req, res, next) => {
  const { unitname } = req.body;

  const unit = new Unit({
    name: unitname
  });

  unit.save((err, unit) => {
    if (err) { console.log(err.message); }
    // console.log(unit);
    res.redirect('/units');
  });
}

// Get Single Unit
exports.getUnit = async (req, res, next) => {
  console.log(req.params)
  const unit = await Unit.findById(req.params.id);
  const dispatch = await Dispatch.find({ unit: req.params.id }).populate('unit').populate({ path: 'stock', model: 'Stock', populate: { path: 'part', model: 'Part', populate: { path: 'brand', model: 'Brand' } } });
  res.json({unit, dispatch});
}

// Delete Single Unit
exports.deleteUnit = async (req, res, next) => {
  // console.log(req.params.id)
  await Unit.findByIdAndDelete({ _id: req.params.id });
  res.json({ msg: 'Unit deleted...' })
}
