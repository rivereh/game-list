import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    gameId: {
      type: String,
      required: true,
    },
    gameName: {
      type: String,
    },
    dateCompleted: {
      type: String,
    },
    img: {
      type: String,
    },
    desc: {
      type: String,
      max: 500,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
)

export default mongoose.model('Post', PostSchema)
