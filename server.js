import './env.js'
import mongoose from 'mongoose'
import app from './app.js'

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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
})

const Tour = mongoose.model('Tour', tourSchema)

const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497,
})

testTour
  .save()
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.log(err)
  })

// --------------
// Create server
// --------------
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on ${port} port...`)
})
