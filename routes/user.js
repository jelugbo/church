var user = require('../models/user').user;
      
exports.index = function(req, res) {
  user.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { users: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}


exports.create = function(req, res) {
      
  var user_first_name = req.body.user_first_name; // First name of user.
  var user_last_name = req.body.user_last_name; // Last name of the user
  var user_email_address = req.body.user_email_address; 
  var user_password = req.body.user_password;

user.findOne({ email_address: { $regex: new RegExp(user_email_address, "i") } },
function(err, doc) { // Using RegEx - search is case insensitive
    if(!err && !doc) {
      
      var newuser = new user();
      
      newuser.first_name = user_first_name;
      newuser.last_name = user_last_name;
      newuser.email_address = user_email_address;
      newuser.password = user_password;
      
      newuser.save(function(err) {
      
        if(!err) {
          res.json(201, {message: "user created with email_address: " +
newuser.email_address });


        } else {
          res.json(500, {message: "Could not create user. Error: " + err});
        }
      
      });
      
    } else if(!err) {
      
      // User is trying to create a user with a name that
      // already exists.
      res.json(403, {message: "user with that email address already exists, please update instead of create or create a new user with a different email address."});
      
    } else {
      res.json(500, { message: err});
    }
  });
      
}


exports.auth = function(req, res) {
      
  var user_email_address = req.body.user_email_address; 
  var user_password = req.body.user_password;
console.log ('user_email_address is ' + user_email_address);
console.log ('user_password is ' + user_password);
user.findOne({ email_address: user_email_address , password: user_password},
function(err, doc) { // Using RegEx - search is case insensitive


 if(!err && doc) {
      res.json(200, doc.id);
      //res.cookie(doc.id , req.param.name).send ('TOKEN: ' + doc.id);

    } else if(err) {
      res.json(500, { message: "Error loading user." + err});
    } else {
      res.json(404, { message: "user not found."});
      res.json(404, doc);
    }
 // });

  });
      
}



exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the user the user you want to look up.
  user.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading user." + err});
    } else {
      res.json(404, { message: "user not found."});
    }
  });
}




exports.delete = function(req, res) {
      
  var id = req.body.id;
  user.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "user removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find user."});
    } else {
      res.json(403, {message: "Could not delete user. " + err});
    }
  });
}

exports.update = function(req, res) {
  
  var id = req.body.id;

  var user_first_name = req.body.user_first_name; // First name of user.
  var user_last_name = req.body.user_last_name; // Last name of the user
  var user_email_address = req.body.user_email_address; 
  var user_password = req.body.user_password;
      
  user.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.user_first_name = user_first_name;
        doc.user_last_name = user_last_name;
		doc.user_email_address = user_email_address;
        doc.user_password = user_password;
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "user updated: " +
user_name});
          } else {
            res.json(500, {message: "Could not update user. " +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find user."});
      } else {
        res.json(500, { message: "Could not update user. " +
err});
      }
    });
}
