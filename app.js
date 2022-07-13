const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();
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

app.engine('.hbs', engine({
  extname: '.hbs',
  runtimeOptions: { allowProtoPropertiesByDefault: true }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

// Make JSON pretty formatted
app.set('json spaces', 2);

app.get('/', async (req, res, next) => {
  res.redirect('/brands');
});

// Views Routes
app.use('/brands', require('./routes/brand'));
app.use('/parts', require('./routes/part'));
app.use('/stocks', require('./routes/stock'));
app.use('/units', require('./routes/unit'));
app.use('/dispatches', require('./routes/dispatch'));

// Api Routes
app.use('/api/brands', require('./routes/api/brand'));
app.use('/api/parts', require('./routes/api/part'));
app.use('/api/stocks', require('./routes/api/stock'));
app.use('/api/units', require('./routes/api/unit'));
app.use('/api/dispatches', require('./routes/api/dispatch'));

const port = process.env.PORT || 1000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
