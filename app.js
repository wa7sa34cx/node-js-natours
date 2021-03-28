import express from 'express'
import morgan from 'morgan'
import {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
} from './handlers/tours.js'

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

// -------
// Routes
// -------
app.route('/api/v1/tours').get(getAllTours).post(createTour)

app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour)

// app.route('/api/v1/users').get(getAllUsers).post(createUser)

// app
//   .route('/api/v1/users/:id')
//   .get(getUserById)
//   .patch(updateUser)
//   .delete(deleteUser)

// -----------
// Run server
// -----------
const port = 3013

app.listen(port, () => {
  console.log(`Listening on ${port} port...`)
})
function newFunction() {
  'use strict'
}
