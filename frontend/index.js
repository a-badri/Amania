const express = require(`express`)
const path = require(`path`)
const app = express()

// app.set(`port`, 8080)
app.set(`view engine`, `pug`)
app.use(express.static(path.join(__dirname, "public")))
// app.use(bodyParser.json());



app.get(`/`, (req, res) => {
  res.render(`index`)
})

app.get(`/sign-up`, (req, res) => {
  res.render(`sign-up`)
})

app.get(`/login`, (req, res) => {
  res.render(`login`)
})

app.get(`/profile`, (req, res) => {
  res.render(`profile`)
})



app.get(`/products`, (req, res) => {
  res.render(`products`)
})


app.get(`/products/:id(\\d+)`, (req, res) => {
  res.render(`product-id`)
})

const port = 8080
app.listen(port, () => console.log(`listening to port ${port}...`))

module.exports = app;
