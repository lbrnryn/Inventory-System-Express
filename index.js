const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/inventory')
  .catch(err => { console.error(err) });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
app.set('json spaces', 2);

// Views Routes
app.use("/", require("./routes/index"));
app.use('/dispatches', require('./routes/dispatch'));

// Api Routes
app.use('/api/brands', require('./routes/api/brand'));
app.use('/api/parts', require('./routes/api/part'));
app.use('/api/stocks', require('./routes/api/stock'));
app.use('/api/units', require('./routes/api/unit'));
app.use('/api/dispatches', require('./routes/api/dispatch'));

app.get('/pagenotfound', (req, res) => res.render('pagenotfound'));

app.use((req, res) => { res.redirect('/pagenotfound') });

app.use((err, req, res, next) => {
  console.log('Error handling middleware', err);
});

const port = process.env.PORT || 2000
app.listen(port, () => console.log(`Listening on port ${port}`));
