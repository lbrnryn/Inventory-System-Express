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
        const parts = await Part.find().populate('brand').lean();

        const uniquePartNames = [...new Set(parts.map(part => part.name))];
        
        const stocks = await Stock.find().lean().populate('brand').populate('part');
        const units = await Unit.find().lean();
        const dispatches = await Dispatch.find().populate('stock').lean();

        res.render('index', { brands, parts, uniquePartNames, stocks, units, dispatches })
    } catch (err) { next(err) }
});

module.exports = router;