import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import userRoute from './routes/users.js'
import postRoute from './routes/posts.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const PORT = process.env.PORT || 3001
const app = express()
const __dirname = path.resolve()

connectDB()

app.use(express.json())
app.use(cookieParser())

// routes
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, 'client/dist')))

// Fallback to index.html for all non-API routes (SPA routing)
app.get('*', (req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.sendStatus(404)
  }
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
