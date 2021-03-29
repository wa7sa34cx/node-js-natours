import express from 'express'

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../handlers/users.js'

const router = express.Router()

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser)

export default router
