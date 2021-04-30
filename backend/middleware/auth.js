const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  const header = req.headers['authorization']
  const token = header && header.split(' ')[1]

  if (token === null) {
    return res.status(401).json({ message: 'Access denied' })
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
    if (err) {
      return res.status(404).json({ message: 'Access denied' })
    }

    req.user = data
    next()
  })
}

module.exports = { verifyToken }
