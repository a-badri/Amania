const {check, validationResult} = require(`express-validator`)

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next)

const serverValidation = (req, res, next) => {
  const validators = validationResult(req)
  
  if (!validators.isEmpty()) {
    // console.log(validators)
    const errors = validators.array().map((error) => error.msg)
    const err = new Error(`Bad request.`)
    err.status = 403;
    err.errors = errors;
    err.title = `Invalid Inputs`;
    return next(err)
  }
  next()
}







module.exports = {asyncHandler, serverValidation}
