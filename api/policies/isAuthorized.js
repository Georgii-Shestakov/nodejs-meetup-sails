module.exports = function(req, res, next) {
  if (req.header('authorization')) {
    let token = req.header('authorization').split('Bearer ')[1];

    if (!token) {
      return res.json( 401, { message: "No Authorization header was found" })
    }

    return webtoken.verify(token, (err, payload) => {
      if ( err ) {
        return res.json( 401, { message: "Invalid Token", detail: err })
      }
      // If there's no user ID in the token
      if (!payload.id) {
        return res.json( 401, { message: "Invalid Token"})
      }
      // Otherwise try to look up that user
      User.findOne(payload.id, (err, user) => {
        if (err) {
          return res.negotiate(err);
        }

        if (!user) {
          return res.json( 401, { message: "Invalid Token"})
        }
        req.token = payload.sub;
        req.user = user;
        return next();
      });
    });
  }
  // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
  // send a 401 response letting the user agent know they need to login to
  // access this endpoint.
  if (req.wantsJSON) {
    return res.send(401);
  }
  return res.json( 401, { message: "No Authorization header was found" })
};
