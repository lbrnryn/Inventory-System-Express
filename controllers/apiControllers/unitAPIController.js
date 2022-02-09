const Unit = require('../.././models/unit');

// Get All Units
exports.getUnits = async (req, res, next) => {
  const units = await Unit.find(req.query);
  res.json(units);
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
  // console.log(req.params)
  const unit = await Unit.findById(req.params.id);
  // const dispatch = await Dispatch.find({ unit: req.params.id });
  // res.json({unit, dispatch});
  res.json(unit);
}

// Delete Single Unit
exports.deleteUnit = async (req, res, next) => {
  // console.log(req.params.id)
  await Unit.findByIdAndDelete({ _id: req.params.id });
  res.json({ msg: 'Unit deleted...' })
}
