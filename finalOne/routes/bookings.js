const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

// Create a new booking (User)
router.post('/', async (req, res) => {
    const { userId, serviceId, date, bikeName, bikeModel,bikeNumber } = req.body;

    if (!bikeName || !bikeModel || bikeNumber) {
        return res.status(400).json({ msg: 'Please provide bike name and model' });
    }

    try {
        const booking = new Booking({
            user: userId,
            service: serviceId,
            date: new Date(date),
            bikeName,
            bikeModel,
            bikeNumber
        });

        await booking.save();

        res.status(201).json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all bookings (Admin)
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user').populate('service');
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update booking status (Admin)
router.put('/:id', async (req, res) => {
    const { status } = req.body;

    try {
        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        booking.status = status;

        await booking.save();

        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get user's bookings (User)
router.get('/user/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId }).populate('service');
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status (500).send('Server error');
    }
});

module.exports = router;
