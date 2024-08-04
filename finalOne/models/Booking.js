// booking schema
const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'ready for delivery', 'completed'],
    default: 'pending',
  },
  bikeName: {
    type: String,
    required: true,
  },
  bikeModel: {
    type: String,
    required: true,
  },
  bikeNumber: {
    type: String,
    required: true,
  },
  preferredLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BikeStation',
    required: true,
  },
})

module.exports = mongoose.model('Booking', bookingSchema)
