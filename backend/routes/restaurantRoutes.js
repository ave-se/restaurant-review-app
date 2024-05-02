const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Restaurant = require('../models/Restaurant');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete one restaurant
router.delete('/:id', (req, res) => {
  Restaurant.findByIdAndDelete(req.params.id)
    .then(() => res.json('Restaurant deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get one restaurant
router.get('/:id', getRestaurant, (req, res) => {
  res.json(res.restaurant);
});

// Create one restaurant
router.post('/', upload.single('image'), async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const restaurant = new Restaurant({
    name: req.body.name,
    location: req.body.location,
    image: url + '/uploads/' + req.file.filename,
    review: req.body.review,
    rating: req.body.rating,
  });

  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function for getting restaurant by ID
async function getRestaurant(req, res, next) {
  let restaurant;
  try {
    const id = req.params.id.trim(); // Trim whitespace from the ID
    restaurant = await Restaurant.findById(id);
    if (restaurant == null) {
      console.log('Cannot find restaurant with ID:', id);
      return res.status(404).json({ message: 'Cannot find restaurant' });
    }
  } catch (err) {
    console.log('Error finding restaurant:', err);
    return res.status(500).json({ message: err.message });
  }

  res.restaurant = restaurant;
  next();
}

module.exports = router;