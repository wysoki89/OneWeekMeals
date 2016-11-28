var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
// models
var User = require('./models/user');

module.exports = function(passport){
  // passport login
  passport.use('login', new LocalStrategy({
      passReqToCallback : true
    },
    function(req, username, password, done) { //done is a callback function which is specified in the body below, it is than internally used by passport.authenticate
      // check in mongo if the username exist
      User.findOne({ username: username }, function (err, user) {
      // in case of error return callback function with error
        if (err){
          // returning callback function stops executing the verification code and jumps back to passport.authenticate   
            return done(err); 
          }
        if (!user) {
          console.log('User Not Found with username '+username);
          return done(null, false, req.flash('message', 'User Not found.')); 
        }
        //   user exists but wrong password
        if (!isValidPassword(user, password)){
            console.log('Invalid Password');
            return done(null, false, 
                req.flash('message', 'Invalid Password'));
        }
        //  user and password match - return done callback with authenticated user   
        return done(null, user);
      });
    }
  ));
  passport.use('signup', new LocalStrategy({passReqToCallback : true}
  ,function(req, username, password, done){
    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      User.findOne({'username':username},function(err, user) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');
          return done(null, false, 
             req.flash('message','User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = createHash(password);
          // newUser.email = req.param('email');
          // newUser.firstName = req.param('firstName');
          // newUser.lastName = req.param('lastName');
 
          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);  
              throw err;  
            }
            console.log('User Registration succesful');    
            return done(null, newUser);
          });
        }
      });
    };
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop - in other words: make this function async like setTimeOut(function)
    process.nextTick(findOrCreateUser);
  }));  

  var isValidPassword = function(user, password){
      return bCrypt.compareSync(password, user.password);
  }
  // Generates hash using bCrypt. hash function takes password and salt(additional input which is random data)
  var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }
  // serialize and deserialize are required for persistent login sessions
  // serialize - store user's id into current session eg mongo collection sessions
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  // deserialize - find user by id out of current session
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}