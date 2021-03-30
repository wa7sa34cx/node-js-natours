import './env'
import app from './app'

// console.log(app.get('env'))
// console.log(process.env)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on ${port} port...`)
})
