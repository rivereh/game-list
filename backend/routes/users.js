const User = require('../models/User')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
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

router.post('/logout', async (req, res) => {
  try {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) })
    res.status(200).json({ message: 'User logged out' })
  } catch (error) {
    res.status(500).json(error)
  }
})

// update user
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (error) {
        return res.status(500).json(error)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      res.status(200).json({ message: 'Account has been updated' })
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json({ message: 'You can only update your account' })
  }
})

// delete user
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: 'Account has been deleted' })
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json({ message: 'You can only delete your account' })
  }
})

// get a user
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    } else {
      res.status(400)
      throw new Error('User not found')
    }
  })
)

// follow a user
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { following: req.params.id } })
        res.status(200).json('User has been followed')
      } else {
        res.status(403).json({ message: 'You already follow this user' })
      }
    } catch (error) {
      res.status(403).json(error)
    }
  } else {
    res.status(403).json({ message: 'You cannot follow yourself' })
  }
})

// unfollow a user
router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { following: req.params.id } })
        res.status(200).json('User has been unfollowed')
      } else {
        res.status(403).json({ message: 'You dont follow this user' })
      }
    } catch (error) {
      res.status(403).json(error)
    }
  } else {
    res.status(403).json({ message: 'You cannot unfollow yourself' })
  }
})

module.exports = router
