// import the requirement
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Admin = require('../models/Admin')
require('dotenv').config()

// define authentication middleware function
const authMiddleware = async (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user =
      (await User.findById(decoded.id)) || (await Admin.findById(decoded.id))

    if (!req.user) {
      return res
        .status(401)
        .json({ msg: 'User not found, authorization denied' })
    }

    next()
  } catch (err) {
    console.error(err)
    res.status(401).json({ msg: 'Token is not valid' })
  }
}

// export the authentication function
module.exports = authMiddleware
