const router = require('express').Router();
const Brand = require('../models/brand');
const Part = require('../models/part');
const Unit = require('../models/unit');
const Stock = require('../models/stock');
const Dispatch = require('../models/dispatch');

// GET - /
router.get('/', async (req, res, next) => {
    try {
        const brands = await Brand.find().lean();
        const parts = await Part.find().lean();

        const uniquePartNames = [...new Set(parts.map(part => part.name))];
        
        const stocks = await Stock.find().lean();
        const units = await Unit.find().lean();
        const dispatches = await Dispatch.find().populate('stock').lean();

        res.render('index', { brands, parts, uniquePartNames, stocks, units, dispatches })
    } catch (err) { next(err) }
});

// POST - /parts - Add Single Part 
router.post('/parts', async (req, res, next) => {
    try {
    //   const nameExist = await Part.findOne({ name: req.body.partname, brand: req.body.brandname });
    //   if (nameExist) {
    //     console.log('Part is already exist');
    //     res.redirect('/parts');
    //     return;
    //   }
        await Part.create({ name: req.body.partname, brand: req.body.brandname });
        res.redirect('/');
    } catch (err) { next(err) }
});

// PUT - /parts/:id - Edit a part
router.put('/parts/:id', async (req, res, next) => {
    try {
        await Part.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.partname, brand: req.body.brandname });
        res.redirect('/');
    } catch (err) { next(err) }
});

// DELETE - /parts/:id - Delete a brand
router.delete('/parts/:id', async (req, res, next) => {
    try {
        await Part.findByIdAndDelete({ _id: req.params.id });
        res.redirect('/');
    } catch (err) { next(err) }
});

// POST - /stocks - Add a stock
router.post('/stocks', async (req, res, next) => {
    try {
        const { partname, brandname, quantity, price } = req.body;
        await Stock.create({
        // part: partname,
        part: { name: partname, brand: brandname },
        quantity: quantity,
        price: price
        });
        res.redirect('/');
    } catch (err) { next(err) }
});

// PUT - /stocks/:id - Edit a stock
router.put('/stocks/:id', async (req, res, next) => {
    try {
        const { partname, brandname, quantity, price } = req.body;
        let stock = {
        part: {
            name: partname,
            brand: brandname
        },
        quantity: quantity,
        price: price
        };
        await Stock.findByIdAndUpdate({ _id: req.params.id }, stock);
        res.redirect('/');
    } catch (err) { next(err) }
});

// DELETE - /stocks/:id - Delete a stock
router.delete('/stocks/:id', async (req, res, next) => {
    try {
        await Stock.findByIdAndDelete({ _id: req.params.id });
        res.redirect('/');
    } catch (err) { next(err) }
});
  

module.exports = router;