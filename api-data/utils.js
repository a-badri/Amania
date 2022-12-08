

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next)

const serverValidation = (req, res, next) => {
  const validators = validationResult(req)
  
  if (!validators.isEmpty()) {
    const errors = validators.array().map((err) => err.msg)
    const err = Error(`bad request`)
    err.status = 400;
    err.errors = errors
    err.title = `Invalid Inputs`
    return next(err)
  }
  next()
}







module.exports = {asyncHandler, serverValidation}
