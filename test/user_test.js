const assert = require('assert');
const mocha = require('mocha')

// require('./setup')
const UserModel = require('../models/user');

var user;
// Describe our tests
describe('Saving records', function(){

  // Create tests
  it('Saves a record to the database', function(done){

     user = new UserModel({
      email: 'test12356@test.com', 
      password: '123', 
    });

    user.save().then(function(){
      assert(!user.isNew);
      done();
    });

  });

});
