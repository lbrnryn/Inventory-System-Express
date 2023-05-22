const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();
const mongoose = require('mongoose');

(async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/inventory');
    console.log('Database Connected!');
  } catch (err) { console.log(err) };
})()

const app = express();

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
app.set('json spaces', 2);

// Views Routes
app.use("/", require("./routes/home"));
app.use('/units', require('./routes/unit'));
app.use('/dispatches', require('./routes/dispatch'));

// Api Routes
app.use('/api/brands', require('./routes/api/brand'));
app.use('/api/parts', require('./routes/api/part'));
app.use('/api/stocks', require('./routes/api/stock'));
// app.use('/api/units', require('./routes/api/unit'));
app.use('/api/dispatches', require('./routes/api/dispatch'));

const port = process.env.PORT || 2000
app.listen(port, () => { console.log(`Listening on port ${port}`) });
