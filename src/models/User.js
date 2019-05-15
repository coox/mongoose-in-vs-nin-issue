const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  { tags: [String] },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
