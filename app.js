import express from 'express'
import morgan from 'morgan'

import AppError from './utils/appError.js'
import toursRouter from './routes/toursRouter.js'
import usersRouter from './routes/usersRouter.js'

// Initialize application
const app = express()

// ------------
// Middlewares
// ------------

// JSON middleware
app.use(express.json())

// Our own middleware
// app.use((req, res, next) => {
//   console.log('Hello from the middleware')
//   next()
// })

// Morgan
if (process.env.MODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// -------------
// Static files
// -------------
app.use(express.static('public'))

// -------
// Routes
// -------
app.use('/api/v1/tours', toursRouter)
app.use('/api/v1/users', usersRouter)

// -------------------
// All other requests
//--------------------
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // })
  // console.log(req)
  // next()

  // const err = new Error(`Can't find ${req.originalUrl} on this server!`)
  // err.status = 'fail'
  // err.statusCode = 404

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// -----------------
// Error middleware
// -----------------

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})

export default app
