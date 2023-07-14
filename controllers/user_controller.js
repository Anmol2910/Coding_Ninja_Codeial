const User = require("../models/user");

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function(err, user){

        return res.render('user', {
            title : "Profile Page",
            profile_user : user
        
        });
    });
    
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back')
        });
    } else{
        return res.status(401).send('unauthorized');
    }
}
  
// Render the sign up page
module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// Render the sign in page
module.exports.signIn = function (req, res) {
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}


// Get the sign up data
module.exports.create = function (req, res) {
  
    if (req.body.password != req.body.Confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding user Signing up');
            return
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('Error in creating user Signing up');
                    return
                }
                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }

    });
}


// Sign In and create the session for the User
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    // Your code here
  
    req.logout(function(err) {
      if (err) {
        console.log('Error logging out:', err);
        return;
      }
      // Redirect or respond after successful logout
      res.redirect('/');
    });
  
    // Your code here
  }
  
