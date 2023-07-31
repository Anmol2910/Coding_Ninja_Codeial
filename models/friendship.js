const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({

    // The user who sent the request
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //   The user who accept this request
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;