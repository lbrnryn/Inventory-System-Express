const mongoose = require('mongoose');

const brand = new mongoose.Schema({
  name: { type: String, uppercase: true, trim: true}
}, { timestamps: true });

module.exports = mongoose.model('Brand', brand);
