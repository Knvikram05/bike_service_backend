const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

// Connect to the database
connectDB()

// Middleware
app.use(express.json())

// Define Routes
app.use('/api/users', require('./routes/users')) // user register
app.use('/api/auth', require('./routes/auth')) // user login
app.use('/api/admin', require('./routes/admin')) // admin login
app.use('/api/services', require('./routes/services')) // manage services(CRUD);
app.use('/api/bike-stations', require('./routes/bikeStations')) // manage bike-stations(CRUD)
app.use('/api/bookings', require('./routes/bookings')) // manage bookings(CRUD)

// server connection
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
