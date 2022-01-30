const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Part = require('./part');

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true
  },
  createdAt: {
    type: String,
    default: DateTime.now().toLocaleString(),
  }
});

module.exports = mongoose.model('Unit', unitSchema);
