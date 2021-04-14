// import fs from 'fs'
// import path from 'path'
import Tour from './../models/tourModel.js'

// const __dirname = path.resolve()
// const toursDB = path.resolve(__dirname, 'dev-data/data/tours-simple.json')
// const tours = JSON.parse(fs.readFileSync(toursDB))

// ---------
// Check ID
// ---------
// export const checkID = (req, res, next, val) => {
// const tour = tours.find(el => el.id === val * 1)
// console.log(val)
// console.log(tour)

// if (!tour) {
//   return res.status(404).json({
//     status: 'fail',
//     message: 'Invalid ID',
//   })
// }

// next()
// }

// -----------
// Check Body
// -----------
// export const checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     })
//   }

//   next()
// }

// -----------------------
// Get all tours function
// -----------------------
export const getAllTours = async (req, res) => {
  try {
    console.log(req.query)

    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    // })

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy')

    // const tours = await Tour.find(req.query)

    // build query
    // 1. filtering
    const queryObj = { ...req.query }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObj[el])

    // 2. advanced filtering
    let queryStr = JSON.stringify(queryObj)
    // console.log(queryStr)
    queryStr = queryStr.replace(/(gte|gt|lt|lte)\b/g, match => `$${match}`)
    // console.log(JSON.parse(queryStr))
    let query = Tour.find(JSON.parse(queryStr))

    // 3. Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      console.log(sortBy)

      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    // 4. fields limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      query = query.select(fields)
    } else {
      query = query.select('-__v')
    }

    // execute query
    const tours = await query

    // send responce
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: err,
      },
    })
  }
}

// ------------------------
// Get tour by id function
// ------------------------
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)

    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: err,
      },
    })
  }
}

// -------------------------
// Create new tour function
// -------------------------
export const createTour = async (req, res) => {
  // const tour = new Tour({})
  // tour.save()
  try {
    const tour = await Tour.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: err,
      },
    })
  }
}

// ---------------------
// Update tour function
// ---------------------
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: err,
      },
    })
  }
}

// ---------------------
// Delete tour function
// ---------------------
export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: {
        message: err,
      },
    })
  }
}
