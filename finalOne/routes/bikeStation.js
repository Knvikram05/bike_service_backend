const express = require('express');
const { check, validationResult } = require('express-validator');
const BikeStation = require('../models/BikeStation');

const router = express.Router();

// Create a new bike station (Admin)
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, location, servicesOffered } = req.body;

  try {
    const bikeStation = new BikeStation({
      name,
      location,
      servicesOffered
    });

    await bikeStation.save();
    res.status(201).json(bikeStation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all bike stations
router.get('/', async (req, res) => {
  try {
    const bikeStations = await BikeStation.find().populate('servicesOffered');
    res.json(bikeStations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a bike station (Admin)
router.put('/:id', [
  check('name', 'Name is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty()
], async (req, res) => {
  const { name, location, servicesOffered } = req.body;

  try {
    let bikeStation = await BikeStation.findById(req.params.id);

    if (!bikeStation) {
      return res.status(404).json({ msg: 'Bike station not found' });
    }

    bikeStation.name = name;
    bikeStation.location = location;
    bikeStation.servicesOffered = servicesOffered;

    await bikeStation.save();
    res.json(bikeStation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a bike station (Admin)
router.delete('/:id', async (req, res) => {
  try {
    let bikeStation = await BikeStation.findById(req.params.id);

    if (!bikeStation) {
      return res.status(404).json({ msg: 'Bike station not found' });
    }

    await bikeStation.remove();
    res.json({ msg: 'Bike station removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
    