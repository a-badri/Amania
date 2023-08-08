const jwt = require(`jsonwebtoken`)
const bearerToken = require(`express-bearer-token`)
const db = require(`./db/models`)
const {jwtConfig} = require(`./config`)
const {secret, expireIn} = jwtConfig

const genToken = user => {
  const {id, username, email} = user
  const data = {id, email}
  const token = jwt.sign( 
    data, secret
  )
  

  return token;
}

const userAuth = (req, res, next) => {
  const {token} = req

  console.log(token)

  if(!token) {
    return res.set(`WWW-Authenticate`, `Bearer`).status(401).end()
  }

  jwt.verify(token, process.env.SECRET, null, async(err, jwtPayload) => {
    if (err) {
      return next(err)
    }

    console.log(token)

    const {id} = jwtPayload

    try {
    req.user = await db.User.findByPk(id)
    }
    catch (e) {
      return next(e)
    }

    if (!req.user) {
      return res.set(`WWW-Authenticate`, `Bearer`).status(401).end()
    }
    return next()
  })
}

const requireAuth = [bearerToken(), userAuth]
module.exports = {genToken, requireAuth}
