const mongoose = require('mongoose');

// bike station data schema 

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
});

const bikeStation = mongoose.model('BikeStation', bikeStationSchema);
module.exports = bikeStation;
