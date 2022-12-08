const jwt = require(`jsonwebtoken`)




const genToken = user => {

  const {username, email} = user
  const data = {username, email}
  const token = jwt.sign( 
    {data}, process.env.SECRET, {expireIn: 604800}
  )

  req.token = token;

  return token;
}

const userAuth = (req, res, next) => {
  const {token} = req

  jwt.verify(token, process.env.SECRET, null, )
}


module.exports = {genToken}
