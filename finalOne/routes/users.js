const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const router = express.Router()
// route to register the new user
router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    check('mobileNumber', 'Mobile number is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { username, email, password, mobileNumber } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }

      user = new User({
        username,
        email,
        password,
        mobileNumber,
      }) // create new user

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save() // save new user

      res.status(201).json({ msg: 'User registered successfully' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)
// export router
module.exports = router
