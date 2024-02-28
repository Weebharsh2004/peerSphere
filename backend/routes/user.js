const express = require('express');
const User = require('../db/userSchema');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const validateRegistration = require('../middleware/registerValidation');
const secretKey = require('../secrets/token');
const verifyToken = require('../middleware/validateToken');
const Post = require('../db/postSchema');
const validatePost = require('../middleware/validatePosts');
const router = express.Router();


router.post('/register', validateRegistration, async (req, res) => {
    try {
        const { username, email, password, profileImage } = req.validatedData;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                err: 'User already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profileImage,
        });

        await newUser.save();

        res.status(201).json({
            msg: 'User registered successfully',
        });
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({
            err: 'User registration failed',
        });
    }
});


router.post('/login',async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                err:"User not found",
            })
        }

        const passwordMatch= await bcrypt.compare(password,user.password);

        if(!passwordMatch){
            return res.status(401).json({
                err: "Invalid password",
            })
        }

        const token= jwt.sign({
            userId: user._id,
            email: user.email
        }, secretKey,
        {
            expiresIn: '7d'
        })
        res.json({
            msg:'Login successful',
            token: token,
        });

    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({
            err: 'Login failed',
        });
    }
});

router.post('/posts', verifyToken, validatePost, async (req, res) => {
    try {
        const { content, image, topic } = req.validatedData;
        const authorId = req.user.userId;

        const newPost = new Post({
            content,
            image,
            author: authorId,
            topic,
        });

        await newPost.save();

        res.status(201).json({
            msg: "Post successfully created",
            post: {
                _id: newPost._id,
                content: newPost.content,
                image: newPost.image,
                createdAt: newPost.createdAt,
                author: newPost.author,
                topic: newPost.topic,
                upvotes: newPost.upvotes,
                downvotes: newPost.downvotes,
                upvoteCount: newPost.upvoteCount,
                downvoteCount: newPost.downvoteCount,
                comments: newPost.comments,
            },
        });
    } catch (err) {
        console.error("Error creating post: ", err.message);
        res.status(500).json({
            err: "Post creation failed",
        });
    }
});

router.get('/allposts', async(req,res)=>{
    try {
        const posts = await Post.find().populate('author', 'username'); // Assuming 'author' is the reference field in the Post model pointing to the User model
        res.status(200).json(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

router.get('/search/:partialUsername',verifyToken,async (req,res)=>{
    try {
        const partialUsername= req.params.partialUsername;

        const users = await User.find({ username: { $regex: partialUsername, $options: 'i' } });

        if(users.length===0){
            return res.status(404).json({
                msg: "No users found"
            });
        }

        const matchedUsers = users.map(user =>({
            username: user.username,
            email: user.email,
            profileImageUrl: user.profileImage,
        }))

        res.json({
            msg:"User found",
            users: matchedUsers,
        })
    } catch (error) {
        console.error('Error searching for users: ', error.message);
        res.status(500).json({
            err:"User search failed",
        });
    }
})

router.post('/posts/upvote/:postId',verifyToken,async (req,res)=>{
    try {
        const postId=req.params.postId;
        const userId=req.user.userId;

        const post= await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if(post.upvotes.includes(userId)){
            return res.status(400).json({
                err: "You have already upvoted the post",
            });
        }

        post.downvotes=post.downvotes.filter((id)=> id.toString()!==userId);

        post.upvotes.push(userId);

        post.downvoteCount = post.downvotes.length;
        post.upvoteCount = post.upvotes.length;

        await post.save();

        res.json({
            msg: 'Your post has been updated successfully',
            upvotes: post.upvoteCount
        });
    } catch (error) {
        console.error('Error during upvote:',error.message);
        res.status(500).json({
            err:"upvote failed",
        })
    }
})

router.post('/posts/downvote/:postId',verifyToken ,async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.userId;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if (post.downvotes.includes(userId)) {
            return res.status(400).json({
                err: "You have already downvoted the post",
            });
        }

        post.upvotes = post.upvotes.filter((id) => id.toString() !== userId);

        post.downvotes.push(userId);

        post.downvoteCount = post.downvotes.length;
        post.upvoteCount = post.upvotes.length;

        await post.save();

        res.json({
            msg: 'Your downvote has been updated successfully',
            downvotes: post.downvoteCount
        });
    } catch (error) {
        console.error('Error during downvote:', error.message);
        res.status(500).json({
            err: "Downvote failed",
        });
    }
});

router.post('/posts/comment/:postId', verifyToken,async (req,res)=>{
    try {
        const postId = req.params.postId;
        const userId = req.user.userId;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        const {content}=req.body;

        const newComment= {
            content,
            author: userId,
        }

        post.comments.push(newComment);

        await post.save();

        res.status(200).json({
            msg:"Comment saved",
            content: newComment
        })
    } catch (error) {
        console.error('Error while adding comment: ',error.message);
        return res.status(500).json({
            msg:"comment faild"
        })
    }
})

router.get('/posts/getcomment/:postId',async (req,res)=>{
    const postId=req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
})

module.exports = router;
