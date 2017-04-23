const User = require('../models/user');
const mongoose = require('mongoose');
const passport = require('passport');

function yelpResults(req, res) {
  const yelp = require('yelp-fusion');
  const ObjectId = require('mongoose').Types.ObjectId

  yelp.accessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search({
      term:'Food',
      location: req.query.location
    }).then(response => {
      res.json(response);;
    });
  }).catch(e => {
    res.json(e);
  });

  // add req.query.location search term to the lastsearch field in logged in user model 
  if (req.query.userid && ObjectId.isValid(req.query.userid)) {
    User.findOneAndUpdate(
    { '_id':  ObjectId(req.query.userid) },
    { $set: { 'lastsearch': req.query.location }}
    )
    .exec(function (err, result) {
        if (err) { 
                  console.log("Error occurred", err);
                  res.json({error: "Error occurred"});
        }
      }
    );
  }

}

module.exports = yelpResults;
