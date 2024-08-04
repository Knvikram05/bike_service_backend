const { default: mongoose } = require("mongoose");

//booking data schema

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'ready for delivery', 'completed'],
        default: 'pending'
    },
    bikeName: {
        type: String,
        required: true
    },
    bikeModel: {
        type: String,
        required: true
    },
    bikeNumber: {
        type: String,
        required: true
    }
});


const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
