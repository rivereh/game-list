const User = require('../models/User')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const { auth } = require('../middleware/auth')

const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUser,
  getUserId,
} = require('../controllers/userController')

// register
router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/logout', logoutUser)

// update user
// router.put('/:id', async (req, res) => {
//   if (req.body.userId === req.params.id || req.body.isAdmin) {
//     if (req.body.password) {
//       try {
//         const salt = await bcrypt.genSalt(10)
//         req.body.password = await bcrypt.hash(req.body.password, salt)
//       } catch (error) {
//         return res.status(500).json(error)
//       }
//     }
//     try {
//       const user = await User.findByIdAndUpdate(req.params.id, {
//         $set: req.body,
//       })
//       res.status(200).json({ message: 'Account has been updated' })
//     } catch (error) {
//       return res.status(500).json(error)
//     }
//   } else {
//     return res.status(403).json({ message: 'You can only update your account' })
//   }
// })

// delete user
router.route('/profile').delete(auth, deleteUser).put(auth, updateUser)

// get a user
router.get('/:id', getUser)

// get a user
router.get('/find/:username', getUserId)

// follow a user
router.put('/:id/follow', auth, async (req, res) => {
  if (req.user._id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.user._id)

      if (!user.followers.includes(req.user._id)) {
        await user.updateOne({ $push: { followers: req.user._id } })
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
router.put('/:id/unfollow', auth, async (req, res) => {
  if (req.user._id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.user._id)

      if (user.followers.includes(req.user._id)) {
        await user.updateOne({ $pull: { followers: req.user._id } })
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
