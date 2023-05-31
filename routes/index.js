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
        
        const stocks = await Stock.find().populate('brand').populate('part').lean();
        const units = await Unit.find().lean();
        const dispatches = await Dispatch.find().populate('unit').populate('stock').lean();

        res.render('index', {
            brands,
            parts,
            uniquePartNames,
            stocks,
            units,
            dispatches,
            helpers: {
                modifiedDispatches() {
                    const modifiedDispatches = dispatches.map(dispatch => {
                        const matchedPartData = parts.find(part => part._id.toString() === dispatch.stock.part.toString());

                        return { ...dispatch, stock: { ...dispatch.stock, part: matchedPartData } }
                    });

                    return modifiedDispatches.map(data => {
                        return `
                            <tr data-id='${data._id}'>
                                <td class='border'>${data.unit.plateNumber}</td>
                                <td class='border capitalize'>${data.stock.part.name}</td>
                                <td class='border text-center'>${data.stock.part.brand.name}</td>
                                <td class='border text-center w-12'>1</td>
                                <td class='border text-center'>${data.stock.price}</td>
                                <td class='border'>
                                    <div class='flex justify-around'>
                                        <button type='button' class='editDispatchBtn' data-id='${data._id}'>
                                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-5 h-5 text-blue-600'>
                                                <path stroke-linecap='round' stroke-linejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                                            </svg>
                                        </button>
                                        <button type='button' class='deleteDispatchBtn' data-id='${data._id}'>
                                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-5 h-5 text-red-600'>
                                                <path stroke-linecap='round' stroke-linejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `
                    }).join('');
                }
            }
        })
    } catch (err) { next(err) }
});

module.exports = router;