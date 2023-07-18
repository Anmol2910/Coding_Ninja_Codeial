const User = require("../models/user");

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function(err, user){

        return res.render('user', {
            title : "Profile Page",
            profile_user : user
        
        });
    });
    
}

module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         req.flash('success', 'Updated');
    //         return res.redirect('back')
    //     });
    // } else{
    //     req.flash('error', 'Unauthorized!!!')
    //     return res.status(401).send('unauthorized');
    // }

    if(req.user.id == req.params.id){
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log('**** Multer Error : ', err)}
               
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    // this is saving the path of uploaded file into  the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
          req.flash('error', err);
          return res.redirect('back');
        }
    }else{
            req.flash('error', 'Unauthorized!!!')
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
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    
    // Your code here
  
    req.logout(function(err) {
      if (err) {
        console.log('Error logging out:', err);
        return;
      }

    req.flash('success', 'You have logged out!')
      // Redirect or respond after successful logout
     return res.redirect('/');
    });
  
}
  
