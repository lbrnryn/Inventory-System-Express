const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Part = require('./part');

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Unit', unitSchema);
