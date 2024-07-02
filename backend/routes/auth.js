const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')

// register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    const user = await User.create({
      username,
      email,
      password,
    })

    if (user) {
      generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      })
    } else {
      return res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/logout', async (req, res) => {
  try {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) })
    res.status(200).json({ message: 'User logged out' })
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const validPassword = await user.matchPassword(password)

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    // passed auth
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
