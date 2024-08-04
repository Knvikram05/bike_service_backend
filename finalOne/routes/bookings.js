const express = require('express')
const { check, validationResult } = require('express-validator')
const authMiddleware = require('../middleware/auth')
const Booking = require('../models/Booking')
const Service = require('../models/Service')
const BikeStation = require('../models/BikeStation')
const Admin = require('../models/Admin') // Import Admin model to check admin status

const router = express.Router()

// Create a new booking (Any authenticated user)
router.post(
  '/',
  [
    authMiddleware, // Ensure the request is authenticated
    check('service', 'Service is required').not().isEmpty(),
    check('date', 'Date is required').isISO8601(),
    check('bikeName', 'Bike name is required').not().isEmpty(),
    check('bikeModel', 'Bike model is required').not().isEmpty(),
    check('bikeNumber', 'Bike number is required').not().isEmpty(),
    check('preferredLocation', 'Preferred location is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      service,
      date,
      bikeName,
      bikeModel,
      bikeNumber,
      preferredLocation,
    } = req.body

    try {
      const booking = new Booking({
        user: req.user._id,
        service,
        date,
        bikeName,
        bikeModel,
        bikeNumber,
        preferredLocation,
      })

      await booking.save()
      res.status(201).json(booking)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// Get all bookings (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id)

    if (!admin) {
      return res.status(403).json({ msg: 'Not authorized' })
    }

    const bookings = await Booking.find()
      .populate('user', ['username', 'email'])
      .populate('service', ['name', 'price'])
      .populate('preferredLocation', ['name', 'location'])
    res.json(bookings)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// Get individual user bookings (Authenticated user only)
router.get('/my-bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('service', ['name', 'price'])
      .populate('preferredLocation', ['name', 'location'])
    res.json(bookings)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// Update a booking (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  const { status } = req.body

  try {
    const admin = await Admin.findById(req.user._id)

    if (!admin) {
      return res.status(403).json({ msg: 'Not authorized' })
    }

    let booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' })
    }

    booking.status = status

    await booking.save()

    res.json(booking)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// Delete a booking (Any authenticated user, can delete their own booking)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' })
    }

    // to check that user can delete only his booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ msg: 'Not authorized to delete this booking' })
    }

    await booking.remove()

    res.json({ msg: 'Booking removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
