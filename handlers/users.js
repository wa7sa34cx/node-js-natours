import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()
const usersDB = path.resolve(__dirname, 'dev-data/data/users.json')
const users = JSON.parse(fs.readFileSync(usersDB))

// -----------------------
// Get all users function
// -----------------------
export const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      users,
    },
  })
}

// ------------------------
// Get user by id function
// ------------------------
export const getUserById = (req, res) => {
  // console.log(req.params)
  const id = req.params.id * 1
  const user = users.find(el => el.id === id)

  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
    return
  }

  res.status(404).json({
    status: 'fail',
    message: 'User not found',
  })
}

// -------------------------
// Create new user function
// -------------------------
export const createUser = (req, res) => {
  // console.log(req.body)

  const newId = users[users.length - 1].id + 1
  const newUser = Object.assign({ id: newId }, req.body)

  users.push(newUser)

  fs.writeFile(usersDB, JSON.stringify(users), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    })
  })
}

// ---------------------
// Update user function
// ---------------------
export const updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'User has been updated',
  })
}

// ---------------------
// Delete user function
// ---------------------
export const deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  })
}
