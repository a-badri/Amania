const express = require(`express`)
const path = require(`path`)
const app = express()

app.set(`view engine`, `pug`)
app.use(express.static(path.join(__dirname, "public")))

app.get(`/`, (req, res) => {
  res.render(`index`)
})

app.get(`/sign-up`, (req, res) => {
  res.render(`sign-up`)
})

app.get(`/login`, (req, res) => {
  res.render(`login`)
})

app.get(`/gold`, (req, res) => {
  res.render(`gold`)
})

const port = 8080
app.listen(port, () => console.log(`listening to port ${port}...`))

module.exports = app;
