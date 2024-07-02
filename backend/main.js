const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const PORT = process.env.PORT || 3001
const app = express()
const { connectDB } = require('./config/db')

const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')

const { notFound, errorHandler } = require('./middleware/errorHandler')

connectDB()

app.use(express.json())
app.use(cookieParser())

// routes
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)

app.get('/', (req, res) => {
  res.send('hello')
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
