// bikestation database schema
const mongoose = require('mongoose')

const bikeStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  servicesOffered: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
  ],
})

module.exports = mongoose.model('BikeStation', bikeStationSchema)
