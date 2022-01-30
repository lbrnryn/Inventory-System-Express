const Part = require('../models/part');
const Brand = require('../models/brand');
const Dispatch = require('../models/dispatch');

// Get All Parts
exports.getParts = async (req, res, next) => {
  const brands = await Brand.find().lean();
  const parts = await Part.find().populate('brand').lean();
  const partsCount = await Part.count();
  // const dispatches = await Dispatch.find().populate('unit').populate({ path: 'stock', model: 'Stock', populate: { path: 'part', model: 'Part', populate: { path: 'brand', model: 'Brand' } } }).lean();
  const dispatches = await Dispatch.find().lean();

  res.render('parts', { parts, partsCount, brands, dispatches });
}

// Add Single Part
exports.addPart = (req, res, next) => {
  const { partname, brandname } = req.body;

  const part = new Part({
    name: partname,
    brand: brandname,
  });

  part.save((err, part) => {
    if (err) { console.log(err.message); }
    // console.log(part)
    res.redirect('/parts');
  })
}

// Get Single Part
exports.getPart = async (req, res, next) => {
  // console.log(req.params.id)
  const part = await Part.findById({ _id: req.params.id }).populate('brand').lean();
  res.json(part);
}

// Update Single Part
exports.updatePart = (req, res, next) => {
  const { partname, brandname } = req.body;

  let part = {
    name: partname,
    brand: brandname
  }

  Part.findByIdAndUpdate({ _id: req.params.id }, part, (err) => {
    if (err) { console.log(err.message) }
    res.redirect('/parts');
  });
}

exports.deletePart = async (req, res, next) => {
  // console.log(req.params.id)
  await Part.findByIdAndDelete({ _id: req.params.id });
}

// Get All Dispatch Record related to this part name
exports.getPartRecord = async (req, res, next) => {
  // console.log(req.params.partname);
  // const partRecords = await Part.find({ name: req.params.partname }).populate('brand').lean();
  const partRecords = await Dispatch.find({ stock: req.params.partname }).lean();
  res.json(partRecords);
};
