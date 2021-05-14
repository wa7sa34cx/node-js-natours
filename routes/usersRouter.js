import express from 'express'

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from './../handlers/usersHandler.js'

import { signup } from './../handlers/authHandler.js'

const router = express.Router()

router.post('/signup', signup)
// router.post('/login', login)

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser)

export default router
