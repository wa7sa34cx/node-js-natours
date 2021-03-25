'use strict'

import fs from 'fs'
import express from 'express'

const app = express()
const port = 3013
const toursDB = './dev-data/data/tours-simple.json'

app.use(express.json())

const tours = JSON.parse(fs.readFileSync(toursDB))

// --------------
// Get all tours
// --------------
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  })
})

// ---------------
// Get tour by id
// ---------------
app.get('/api/v1/tours/:id', (req, res) => {
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
})

// ----------------
// Create new tour
// ----------------
app.post('/api/v1/tours', (req, res) => {
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
})

// ------------
// Update tour
// ------------
app.patch('/api/v1/tours/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Tour has been updated',
  })
})

// ------------
// Delete tour
// ------------
app.delete('/api/v1/tours/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Tour has been deleted',
  })
})

// -----------
// Run server
// -----------
app.listen(port, () => {
  console.log(`Listening...`)
})
