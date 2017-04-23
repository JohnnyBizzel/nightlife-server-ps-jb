const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const Reservation = require('./controllers/reservation_controller')
const reservation = new Reservation();

const yelpResults = require('./controllers/yelp_controller')

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// const optionalJwt = function (req, res, next) {
//   if (req.headers['authorization']) {
//     return passport.authenticate('jwt', { session: false })(req, res, next);
//   }
//   return next();
// };

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });
  // signin and out
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  //add/remove businesses to user account
  app.post('/api/businesses', requireAuth, reservation.addReservation) 
  app.delete('/api/businesses', requireAuth, reservation.removeReservation) 
  app.get('/api/businesses', requireAuth, reservation.getReservations) 
  app.post('/api/allreservations', reservation.getAllReservationsFromYelpCall) 

  // access yelp api
  app.get('/openapi/yelp', yelpResults)

  // get current logged in user id
  app.get('/api/me', requireAuth,
    function(req, res) {
      res.json(req.user);
  });
}
