import app from './app.js'

// console.log(app.get('env'))
console.log(process.env)

const port = 3000

app.listen(port, () => {
  console.log(`Listening on ${port} port...`)
})
