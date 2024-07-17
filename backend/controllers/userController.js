const User = require('../models/User')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../utils/generateToken')

// register
const registerUser = async (req, res) => {
  try {
    const { username, email, password, googleAccount } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    const user = await User.create({
      username: username.toLowerCase(),
      displayName: username,
      email,
      password,
      googleAccount,
    })

    if (user) {
      generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        googleAccount: user.googleAccount,
      })
    } else {
      return res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const loginUser = async (req, res) => {
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
      displayName: user.displayName,
      email: user.email,
      googleAccount: user.googleAccount,
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

const logoutUser = async (req, res) => {
  try {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) })
    res.status(200).json({ message: 'User logged out' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.username =
      req.body.username.toLowerCase() || user.username.toLowerCase()
    user.displayName = req.body.displayName || user.displayName
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      displayName: updatedUser.displayName,
      email: updatedUser.email,
      googleAccount: updatedUser.googleAccount,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// delete user
const deleteUser = async (req, res) => {
  await User.findOneAndDelete(req.user._id)
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) })
  res.status(200).json({ message: 'User deleted' })
}

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      displayName: user.displayName,
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

const getUserId = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      displayName: user.displayName,
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

// follow a user
const followUser = async (req, res) => {
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
}

// unfollow a user
const unfollowUser = async (req, res) => {
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
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUser,
  getUserId,
  followUser,
  unfollowUser,
}
