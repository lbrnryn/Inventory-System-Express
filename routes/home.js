const router = require("express").Router();
const Brand = require('../models/brand');
const Part = require('../models/part');
const Unit = require('../models/unit');
const Stock = require('../models/stock');
const Dispatch = require('../models/dispatch');

// GET - /
router.get('/', async (req, res, next) => {
    try {
        const brands = await Brand.find().lean();
        brands.forEach(brand => brand.url = `http://localhost:${process.env.PORT}/api/brands/${brand._id}`);
        
        const parts = await Part.find().lean();
        parts.forEach(part => part.url = `http://localhost:${process.env.PORT}/api/parts/${part._id}`);

        const uniquePartNames = [...new Set(parts.map(part => part.name))];


        const stocks = await Stock.find().lean();
        stocks.forEach(stock => stock.url = `http://localhost:${process.env.PORT}/api/stocks/${stock._id}`);

        const units = await Unit.find().lean();

        const dispatches = await Dispatch.find().lean();

        res.render("home", { brands, parts, uniquePartNames, stocks, units, dispatches })
    } catch (err) { console.log(err) }
});

// POST - /brands - Add a brand
router.post('/brands', async (req, res, next) => {
    try {
        await Brand.create({ name: req.body.brandname });
        res.redirect('/');
    } catch (err) { console.log(err.message) }
});

// PUT - /brands/:id - Edit a brand
router.put('/brands/:id', async (req, res, next) => {
    try {
        await Brand.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.brandname });
        res.redirect('/');
    } catch (err) { console.log(err.message) }
});

// DELETE - /brands/:id
router.delete('/brands/:id', async (req, res, next) => {
    try {
    await Brand.findByIdAndDelete({ _id: req.params.id });
    res.redirect('/');
    } catch (err) { console.log(err.message) }
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
    } catch (err) { console.log(err.message) }
});

// PUT - /parts/:id - Edit a part
router.put('/parts/:id', async (req, res, next) => {
    try {
        await Part.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.partname, brand: req.body.brandname });
        res.redirect('/');
    } catch (err) { console.log(err.message) }
});

// DELETE - /parts/:id - Delete a brand
router.delete('/parts/:id', async (req, res, next) => {
    try {
        await Part.findByIdAndDelete({ _id: req.params.id });
        res.redirect('/');
    } catch (err) { console.log(err.message) }
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
    } catch (err) { console.log(err.message) }
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
    } catch (err) { console.log(err.message) }
});

// DELETE - /stocks/:id - Delete a stock
router.delete('/stocks/:id', async (req, res, next) => {
    try {
        await Stock.findByIdAndDelete({ _id: req.params.id });
        res.redirect('/');
    } catch (err) { console.log(err.message) }
});
  

module.exports = router;