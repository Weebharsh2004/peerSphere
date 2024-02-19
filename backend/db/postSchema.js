const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    topic: {
        type: String,
        enum: ['academics', 'technology', 'placements', 'extra_curricular', 'personal_life', 'others'],
        required: true,
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    upvoteCount: {
        type: Number,
        default: 0,
    },
    downvoteCount: {
        type: Number,
        default: 0,
    },
    comments: [commentSchema],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
