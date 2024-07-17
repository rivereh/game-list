const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')
const { auth } = require('../middleware/auth')

// create a post
router.post('/', auth, async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (error) {
    res.status(500).json(error)
  }
})

// update a post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json('Post has been updated')
    } else {
      res.status(403).json('You can update your own posts only')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.user._id.toString()) {
      await post.deleteOne()
      res.status(200).json('Post has been deleted')
    } else {
      res.status(403).json('You can delete your own posts only')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})
// like/dislike a post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      res.status(200).json({ message: 'Post has been liked' })
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(200).json({ message: 'Post has been unliked' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// get a post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

// get timeline posts
router.get('/timeline/all', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id)
    const userPosts = await Post.find({ userId: currentUser._id })
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId })
      })
    )
    res.status(200).json(
      userPosts
        .concat(...friendPosts)
        .sort((a, b) => a.createdAt - b.createdAt)
        .reverse()
    )
  } catch (error) {
    res.status(500).json(error)
  }
})

// get timeline posts
router.get('/timeline/:id', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id)
    const userPosts = await Post.find({ userId: currentUser._id })

    res
      .status(200)
      .json(userPosts.sort((a, b) => a.createdAt - b.createdAt).reverse())
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
