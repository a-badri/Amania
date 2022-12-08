module.exports = {
  environment: process.env.NODE_ENV || `development`,
  port: process.env.PORT || 4000,
  db: {
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST,
  }
}
