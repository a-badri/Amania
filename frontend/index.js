const express = require(`express`)
const path = require(`path`)
const app = express()


// app.set(`port`, 8080)
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

app.get(`/settings`, (req, res) => {
  res.render(`settings`)
})



app.get(`/products`, (req, res) => {
  res.render(`products`)
})


app.get(`/products/:id(\\d+)`, (req, res) => {
  res.render(`product-id`)
})

app.get(`/sell-product`, (req, res) => {
  res.render("selling-products")
})

const port = 8080
app.listen(port, () => console.log(`listening to port ${port}...`))

module.exports = app;
