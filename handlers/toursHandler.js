// import fs from 'fs'
// import path from 'path'
import Tour from './../models/tourModel.js'
import APIFeatures from './../utils/apiFeatures.js'

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

export const aliasTopTurs = (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next()
}

// -----------------------
// Get all tours function
// -----------------------
export const getAllTours = async (req, res) => {
  try {
    // console.log(req.query)

    // execute query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const tours = await features.query

    // send responce
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
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

// ------------------------
// Get tour by id function
// ------------------------
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)

    res.status(200).json({
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

export const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ])

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

export const getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ])

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
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
