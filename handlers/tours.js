import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()
const toursDB = path.resolve(__dirname, 'dev-data/data/tours-simple.json')
const tours = JSON.parse(fs.readFileSync(toursDB))

// ---------
// Check ID
// ---------
export const checkID = (req, res, next, val) => {
  const tour = tours.find(el => el.id === val * 1)
  // console.log(val)
  // console.log(tour)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }

  next()
}

// -----------
// Check Body
// -----------
export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name or price',
    })
  }

  next()
}

// -----------------------
// Get all tours function
// -----------------------
export const getAllTours = (req, res) => {
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
export const getTourById = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find(el => el.id === id)

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
}

// -------------------------
// Create new tour function
// -------------------------
export const createTour = (req, res) => {
  // console.log(req.body)

  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)

  fs.writeFile(toursDB, JSON.stringify(tours) => {
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
export const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Tour has been updated',
  })
}

// ---------------------
// Delete tour function
// ---------------------
export const deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  })
}
