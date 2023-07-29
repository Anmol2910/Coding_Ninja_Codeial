const Post = require('../models/post');

const User = require('../models/user')

module.exports.home = async function(req, res){
    // Populate the user of Each post

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate : {
            path : 'user'
        },
        populate: {
            path: 'likes'
        }
    }).populate('likes');

    let users = await User.find({});

            return res.render('home', {
                title : 'Codieal | Home',
                posts : posts, 
                all_users : users
            });

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');

    }
 }

