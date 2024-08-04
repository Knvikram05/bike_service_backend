const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

// Connect to the database
connectDB()

// Middleware
app.use(express.json())

// Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/services', require('./routes/services'))
app.use('/api/bike-stations', require('./routes/bikeStations'))
app.use('/api/bookings', require('./routes/bookings'))

// server connection
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
