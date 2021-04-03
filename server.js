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
  })
  .then(() => {
    console.log('DB connection estublished...')
  })

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on ${port} port...`)
})
