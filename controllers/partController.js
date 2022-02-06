const Part = require('../models/part');
const Brand = require('../models/brand');

// Get All Parts
exports.getParts = async (req, res, next) => {
  const brands = await Brand.find().lean();
  const parts = await Part.find().lean();
  const partsCount = await Part.count();

  res.render('parts', { parts, partsCount, brands });
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

// // Get Single Part
// exports.getPart = async (req, res, next) => {
//   // console.log(req.params.id)
//   const part = await Part.findById({ _id: req.params.id }).populate('brand').lean();
//   res.json(part);
// }

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
  res.json({ msg: 'Part deleted...'})
}
