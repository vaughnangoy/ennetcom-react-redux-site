const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

const fieldList = ['email', 'firstname', 'surname', 'password', 'street', 'addressLine2', 'city', 'postcode', 'country', 'contactno'];

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

function getUser(email, cb) {

  var list = fieldList.filter(function(field) {
      return field != 'password'
    }).join(' ');

  var userObj = {};

  console.log('email: ',email);

  User.findOne({ email: email})
    .select(list)
    .exec(cb);
}

exports.signin = function(req, res, next) {
  getUser(req.user.email, function(err, filteredUser) {

    if (err) { 
      return next(err); 
    }

    res.send({ token: tokenForUser(req.user), userDetails: filteredUser });
  });
}

exports.signup = function(req, res, next) {

  
  var errors = [], userObj = {};

  for(var i =  0; i < fieldList.length; i++) {
    if(!req.body[fieldList[i]]) {
      errors.push(fieldList[i]);
    }
    else{
      userObj[fieldList[i]] = req.body[fieldList[i]];
    }
  }

  if(errors.length > 0) {
    return res.status(422).send({signup: { errors: errors}});
  }

  // See if a user with the given email exists
  User.findOne({ email: userObj.email }, function(err, existingUser) {
    if (err) { 
      return next(err); 
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ signup: { errors: {email: 'Email is already registered.'} }});
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User(userObj);

    user.save(function(err) {
      if (err) { 
        return next(err); 
      }

      getUser(userObj.email, function(filteredUser) {
        if (err) { 
          return next(err); 
        }
        // Repond to request indicating the user was created
        res.json({ token: tokenForUser(user),  userDetails: filteredUser});
      });

      
    });
  });
//res.json({ token: 'test123' + Date.now() });
}
