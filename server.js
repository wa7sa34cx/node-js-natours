import './env.js'
import app from './app.js'
import mongoose from 'mongoose'

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

// --------------
// Create server
// --------------
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on ${port} port...`)
})
