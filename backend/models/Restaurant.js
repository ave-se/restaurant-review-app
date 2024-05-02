const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);