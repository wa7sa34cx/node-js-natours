import './../../env.js'
import fs from 'fs'
import mongoose from 'mongoose'
import Tour from './../../models/tourModel.js'

// console.log(app.get('env'))
// console.log(process.env)

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection estublished...')
  })

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
)

const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data successfully loaded!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

// Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data successfully deleted!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

// console.log(process.argv)

if (process.argv[2] === '--import') {
  importData()
}

if (process.argv[2] === '--delete') {
  deleteData()
}
