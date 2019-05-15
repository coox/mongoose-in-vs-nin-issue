const mongoose = require('mongoose');

const collSchema = new mongoose.Schema(
  { tags: [String] },
  { timestamps: true }
);

module.exports = mongoose.model('Coll', collSchema);
