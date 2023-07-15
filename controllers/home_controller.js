const Post = require('../models/post');

const User = require('../models/user')

module.exports.home = async function(req, res){
    // Populate the user of Each post

    try{
        let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate : {
            path : 'user'
        }
    });

    let users = await User.find({});

            return res.render('home', {
                title : 'Codieal | Home',
                posts : posts, 
                all_users : users
            });

    }catch(err){
        console.log('Error', err);
        return;

    }
 }

