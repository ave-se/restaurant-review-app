// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  user: String,
  review: String,
  rating: { type: Number, min: 1, max: 5 },
});

module.exports = mongoose.model('Review', ReviewSchema);