// import fs from 'fs'
// import path from 'path'
import Tour from './../models/tourModel.js'
import APIFeatures from './../utils/apiFeatures.js'
import catchAsync from './../utils/catchAsync.js'
import AppError from './../utils/appError.js'

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
export const getAllTours = catchAsync(async (req, res, next) => {
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
})

// ------------------------
// Get tour by id function
// ------------------------
export const getTourById = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id)

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
})

// const catchAsync = fn => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next)
//   }
// }

// -------------------------
// Create new tour function
// -------------------------
export const createTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  })
  // const tour = new Tour({})
  // tour.save()
  // try {
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'fail',
  //     data: {
  //       message: err,
  //     },
  //   })
  // }
})

// ---------------------
// Update tour function
// ---------------------
export const updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404))
  }

  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  })
})

// ---------------------
// Delete tour function
// ---------------------
export const deleteTour = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id)

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
})

export const getTourStats = catchAsync(async (req, res, next) => {
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
})

export const getMonthlyPlan = catchAsync(async (req, res, next) => {
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
})
