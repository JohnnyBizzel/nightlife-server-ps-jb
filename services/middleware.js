function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log('hey')
      return next()
    }
  
  }
}