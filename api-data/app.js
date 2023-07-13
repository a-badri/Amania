const express = require(`express`)
const morgan = require(`morgan`)
const cors = require(`cors`)
const app = express()
const bodyParser = require(`body-parser`)
const usersRouter = require(`./routes/users`)
const productsRouter = require(`./routes/products`)


app.use(bodyParser.json());

// app.set(`view engine`, `pug`);
app.use(morgan(`dev`));

app.use(cors({
  origin: "*",
  method: ["POST", "GET", "PUT"],
  credentials: true
}))




app.use(`/users`, usersRouter)
app.use(`/products`, productsRouter)

//  app.get(`/`, (req, res, next) => {
//    res.render(`add-user`)
//  }) 

//generic error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  const isProduction = process.env.NODE_ENV === "production"
  res.json({
    title: err.title,
    errors: err.errors,
    messages: isProduction ? null : err.messages,
    stack: isProduction ? null : err.stack
  })
})

module.exports = app;
