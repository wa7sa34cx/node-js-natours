'use strict'

import fs from 'fs'
import express from 'express'

// Initialize application
const app = express()

// global vars
const port = 3013
const toursDB = './dev-data/data/tours-simple.json'

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

// ---------------------------
// SELECT tours from Database
// ---------------------------
const tours = JSON.parse(fs.readFileSync(toursDB))

// -----------------------
// Get all tours function
// -----------------------
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  })
}

// ------------------------
// Get tour by id function
// ------------------------
const getTourById = (req, res) => {
  // console.log(req.params)
  const id = req.params.id * 1
  const tour = tours.find(el => el.id === id)

  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    })
    return
  }

  res.status(404).json({
    status: 'fail',
    message: 'Tour not found',
  })
}

// -------------------------
// Create new tour function
// -------------------------
const createTour = (req, res) => {
  // console.log(req.body)

  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)

  fs.writeFile(toursDB, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    })
  })
}

// ---------------------
// Update tour function
// ---------------------
const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Tour has been updated',
  })
}

// ---------------------
// Delete tour function
// ---------------------
const deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  })
}

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

// -----------
// Run server
// -----------
app.listen(port, () => {
  console.log(`Listening...`)
})
