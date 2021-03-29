import express from 'express'
import morgan from 'morgan'

import toursRouter from './routes/tours.js'
import usersRouter from './routes/users.js'

// Initialize application
const app = express()

// ------------
// Middlewares
// ------------
// JSON middleware
app.use(express.json())

// Our own middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware')
  next()
})

// Morgan
app.use(morgan('dev'))

// -------------
// Static files
// -------------
app.use(express.static('public'))

// -------
// Routes
// -------
app.use('/api/v1/tours', toursRouter)
app.use('/api/v1/users', usersRouter)

export default app
