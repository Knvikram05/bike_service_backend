const express = require('express')
const { check, validationResult } = require('express-validator')
const authMiddleware = require('../middleware/auth')
const Service = require('../models/Service')
const Admin = require('../models/Admin')

const router = express.Router()

// Middleware to ensure the user is an admin
const adminMiddleware = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user._id)
    if (!admin) {
      return res.status(403).json({ msg: 'Access denied, not an admin' })
    }
    next()
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Create a new service (Only admin)
router.post(
  '/',
  [
    authMiddleware,
    adminMiddleware,
    check('name', 'Service name is required').not().isEmpty(),
    check('price', 'Service price is required').isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, description, price } = req.body

    try {
      const service = new Service({
        owner: req.user._id,
        name,
        description,
        price,
      })

      await service.save()
      res.status(201).json(service)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// Get all services (Any user, including admins)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().populate('owner', ['email'])
    res.json(services)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// Update a service (Only admin)
router.put(
  '/:id',
  [
    authMiddleware,
    adminMiddleware,
    check('name', 'Service name is required').optional().not().isEmpty(),
    check('price', 'Service price is required').optional().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, description, price } = req.body

    try {
      let service = await Service.findById(req.params.id)

      if (!service) {
        return res.status(404).json({ msg: 'Service not found' })
      }

      if (req.user._id.toString() !== service.owner.toString()) {
        return res
          .status(403)
          .json({ msg: 'Not authorized to update this service' })
      }

      if (name) service.name = name
      if (description) service.description = description
      if (price) service.price = price

      await service.save()

      res.json(service)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// Delete a service (Only admin)
router.delete('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    let service = await Service.findById(req.params.id)

    if (!service) {
      return res.status(404).json({ msg: 'Service not found' })
    }

    if (req.user._id.toString() !== service.owner.toString()) {
      return res
        .status(403)
        .json({ msg: 'Not authorized to delete this service' })
    }

    await service.remove()

    res.json({ msg: 'Service removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
