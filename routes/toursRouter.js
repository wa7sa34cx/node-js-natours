import express from 'express'

import {
  // checkID,
  // checkBody,
  aliasTopTurs,
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
} from './../handlers/toursHandler.js'

const router = express.Router()

// router.param('id', checkID)
// router.route('/').get(getAllTours).post(checkBody, createTour)

router.route('/top-5-best').get(aliasTopTurs, getAllTours)
router.route('/').get(getAllTours).post(createTour)
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour)

export default router
