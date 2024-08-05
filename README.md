
# Bike_Service Station 
This project is the backend for the Service Station application, providing a comprehensive API for managing service station operations. It is built using Node.js and Express, with MongoDB as the database.

# Table of Contents:
  - Features
  - Technologies
  - Installation
  - API Endpoints
  - Contributing
  - License
  - Contact

# Features:
   - User Registration and Authentication (JWT)
   - Admin Authentication
   - CRUD Operations for Services (Admin only)
   - CRUD Operations for Bike Stations (Admin only)
   - CRUD Operations for Bookings
         - Users can create and delete their own bookings
         - Admins can update and view all bookings
         - Users can view their own bookings
   - Role-based Access Control
# Technologies:
  - Node.js
  - Express
  - MongoDB
  - JWT for Authentication
# Installation:
     - Node.js(express)
     - npm (Node Package Manager)
     - MongoDB(mongoose)
     - jsonwebtoken
     - bcrypt.js

# Install dependencies:
       npm install,
       .env file 
       PORT=5000
       JWT_SECRET=code001
       // this is the login details for admin 
       {
         "email": "admin@gmail.com",
         "password": "1234567890",
         "mobileNumber": "9362853628"
       }
 # Start the server:
      node server.js
      The server will be running at http://localhost:5000.

# API Documentation
The API provides endpoints for managing users, services, bookings, and bike stations. Below are the key endpoints.

# API Endpoints
# Auth
 - POST /api/auth/login - Login a user
 - POST /api/admin/login - Login an admin
# Users
 - POST /api/users/register - register a user
 - GET /api/users/:id - Get a user by ID (Admin only)
 - PUT /api/users/:id - Update a user (Admin only)
 - DELETE /api/users/:id - Delete a user (Admin only)
# Services
 - GET /api/services - Get all services
 - POST /api/services - Create a new service (Admin only)
 - PUT /api/services/:id - Update a service (Admin only)
 - DELETE /api/services/:id - Delete a service (Admin only)
# Bookings
 - POST /api/bookings - Create a new booking (Any authenticated user)
 - GET /api/bookings - Get all bookings (Admin only)
 - GET /api/bookings/my-bookings - Get bookings for the logged-in user
 - PUT /api/bookings/:id - Update a booking (Admin only)
 - DELETE /api/bookings/:id - Delete a booking (Any authenticated user for their own bookings)
# Bike Stations
 - GET /api/bike-stations - Get all bike stations 
 - POST /api/bike-stations - Create a new bike station (Admin only)
 - PUT /api/bike-stations/:id - Update a bike station (Admin only)
 - DELETE /api/bike-stations/:id - Delete a bike station (Admin only)
   
# Contribution:
   Contributions are welcome! Please create a pull request or open an issue for any changes or improvements.

# License:
This project is licensed under the MIT License. See the LICENSE file for details.

# Contact:
For any inquiries, please contact:

Name: VIKRAM K N




Email: knvikram2004@gmail.com
