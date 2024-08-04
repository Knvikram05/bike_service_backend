
# Bike_Service Station Backend
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
# Installation
  Prerequisites
  Ensure you have the following installed:
     Node.js
     npm (Node Package Manager)
     MongoDB
  Steps
   Clone the repository: git clone https://github.com/yourusername/service-station-backend.git
   cd service-station-backend/service-app/server

Install dependencies:
  npm install
  Create a .env file in the root directory and add the following:
       PORT=5000
       JWT_SECRET=your_jwt_secret
Start the server:
      node server.js
      The server will be running at http://localhost:5000.

# API Documentation
The API provides endpoints for managing users, services, bookings, and bike stations. Below are the key endpoints.

API Endpoints
Auth
POST /api/auth/register - Register a new user
POST /api/auth/login - Login a user
POST /api/auth/admin/login - Login an admin
Users
GET /api/users - Get all users (Admin only)
GET /api/users/:id - Get a user by ID (Admin only)
PUT /api/users/:id - Update a user (Admin only)
DELETE /api/users/:id - Delete a user (Admin only)
Services
GET /api/services - Get all services
GET /api/services/:id - Get a service by ID
POST /api/services - Create a new service (Admin only)
PUT /api/services/:id - Update a service (Admin only)
DELETE /api/services/:id - Delete a service (Admin only)
Bookings
POST /api/bookings - Create a new booking (Any authenticated user)
GET /api/bookings - Get all bookings (Admin only)
GET /api/bookings/user - Get bookings for the logged-in user
PUT /api/bookings/:id - Update a booking (Admin only)
DELETE /api/bookings/:id - Delete a booking (Any authenticated user for their own bookings)
Bike Stations
GET /api/bikestations - Get all bike stations
GET /api/bikestations/:id - Get a bike station by ID
POST /api/bikestations - Create a new bike station (Admin only)
PUT /api/bikestations/:id - Update a bike station (Admin only)
DELETE /api/bikestations/:id - Delete a bike station (Admin only)
Contributing
Contributions are welcome! Please create a pull request or open an issue for any changes or improvements.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any inquiries, please contact:

Name: Your Name
Email: your.email@example.com
