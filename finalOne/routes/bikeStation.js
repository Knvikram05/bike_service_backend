const express = require('express')
const { check, validationResult } = require('express-validator')
const authMiddleware = require('../middleware/auth')
const BikeStation = require('../models/BikeStation')
const Service = require('../models/Service')

const router = express.Router()

// Create a new bike station (Admin only)
router.post(
  '/',
  [
    authMiddleware, // Ensure the request is authenticated
    check('name', 'Bike Station name is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, location, servicesOffered } = req.body

    try {
      const bikeStation = new BikeStation({
        name,
        location,
        servicesOffered,
      })

      // Save the new bike station to the database
      await bikeStation.save()
      res.status(201).json(bikeStation)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// Get all bike stations
router.get('/', async (req, res) => {
  try {
    const bikeStations = await BikeStation.find().populate('servicesOffered', [
      'name',
      'price',
    ])
    res.json(bikeStations)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// Update a bike station (Admin only)
router.put(
  '/:id',
  [
    authMiddleware, // Ensure the request is authenticated
    check('name', 'Bike Station name is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, location, servicesOffered } = req.body

    try {
      let bikeStation = await BikeStation.findById(req.params.id)

      if (!bikeStation) {
        return res.status(404).json({ msg: 'Bike Station not found' })
      }

      bikeStation.name = name
      bikeStation.location = location
      bikeStation.servicesOffered = servicesOffered

      await bikeStation.save()

      res.json(bikeStation)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// Delete a bike station (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let bikeStation = await BikeStation.findById(req.params.id)

    if (!bikeStation) {
      return res.status(404).json({ msg: 'Bike Station not found' })
    }

    await bikeStation.remove()

    res.json({ msg: 'Bike Station removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
