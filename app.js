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

//Routes
const brand = require('./routes/brand');
const part = require('./routes/part');
const stock = require('./routes/stock');
const unit = require('./routes/unit');
const dispatch = require('./routes/dispatch');

// API
const api = require('./routes/api');

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
  // console.log('app.get/')
  const brandsCount = await Brand.count();
  const partsCount = await Part.count();
  const unitsCount = await Unit.count();
  const stocksCount = await Stock.count();
  const dispatchesCount = await Dispatch.count();

  res.render('dashboard', {
    brandsCount,
    partsCount,
    unitsCount,
    stocksCount,
    dispatchesCount
  });
});

// app.get('/animals', (req, res) => {
//   console.log(req.query)
//   // console.log(req.query.page, req.query.test)
//   res.json({msg:'ok'})
// })

app.use('/brands', brand);
app.use('/parts', part);
app.use('/stocks', stock);
app.use('/units', unit);
app.use('/dispatches', dispatch);

app.use('/api', api);

const port = 1000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
