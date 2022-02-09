const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');

// Models
const Brand = require('./models/brand');
const Part = require('./models/part');
const Unit = require('./models/unit');
const Stock = require('./models/stock');
const Dispatch = require('./models/dispatch');

// Put this mongoose connection to other folder
async function main() {
  await mongoose.connect('mongodb://localhost:27017/inventory');
  console.log('Database Connected!');
}
main().catch(err => console.log(err));

const app = express();

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // false dapat
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Make JSON pretty formatted
app.set('json spaces', 2);

// function testMiddleware(req, res, next) {
//   console.log('this is a test');
//   next();
// }

app.get('/', async (req, res) => { //app.get('/', testMiddleware, async (req, res) => {
  // const brandsCount = await Brand.count();
  // const partsCount = await Part.count();
  // const unitsCount = await Unit.count();
  // const stocksCount = await Stock.count();
  // const dispatchesCount = await Dispatch.count();
  //
  // res.render('dashboard', {
  //   brandsCount,
  //   partsCount,
  //   unitsCount,
  //   stocksCount,
  //   dispatchesCount
  // });
  res.redirect('/brands');
});

// Views Routes
app.use('/brands', require('./routes/viewsRoutes/brandView'));
app.use('/parts', require('./routes/viewsRoutes/partView'));
app.use('/stocks', require('./routes/viewsRoutes/stockView'));
app.use('/units', require('./routes/viewsRoutes/unitView'));
app.use('/dispatches', require('./routes/viewsRoutes/dispatchView'));

// Api Routes
app.use('/api/brands', require('./routes/apiRoutes/brandAPI'));
app.use('/api/parts', require('./routes/apiRoutes/partAPI'));
app.use('/api/stocks', require('./routes/apiRoutes/stockAPI'));
app.use('/api/units', require('./routes/apiRoutes/unitAPI'));
app.use('/api/dispatches', require('./routes/apiRoutes/dispatchAPI'));

const port = 1000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
