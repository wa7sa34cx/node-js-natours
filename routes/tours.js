import express from 'express'

import {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
} from '../handlers/tours.js'

export const toursRouter = () => {
  const router = express.Router()

  router.route('/').get(getAllTours).post(createTour)
  router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour)

  return router
}
