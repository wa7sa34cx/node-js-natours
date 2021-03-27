'use strict'

import fs from 'fs'
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

// JSON
app.use(express.json())

// Our own middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware')
  next()
})

// Morgan
app.use(morgan('dev'))

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTourById)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

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
