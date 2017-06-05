const jwt = require('jsonwebtoken')

module.exports = {
  issue : (payload) => {
    return jwt.sign(
      payload,
      sails.config.jwt.private_key,
      {
        expiresIn : "1d"
      }
    )
  },
  verify : (token, callback) => {
    return jwt.verify(
      token,
      sails.config.jwt.private_key,
      {},
      callback
    )
  }
}
