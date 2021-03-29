import express from 'express'

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../handlers/users.js'

export const usersRouter = () => {
  const router = express.Router()

  router.route('/').get(getAllUsers).post(createUser)
  router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser)

  return router
}
