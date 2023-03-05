const { validationResult } = require('express-validator/check');
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');


exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: 'Fetched all users successfully.',
      Users: users
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUser = (req, res, next) => {
  const userid = req.params.id;
  // console.log(userid);
  User.findById(userid)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'User fetched.', user: user });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const userid = req.params.id;
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const password = req.body.password;
  const name = req.body.name;
  User.findById(userid)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find user');
        error.statusCode = 404;
        throw error;
      }
      user.password = password;
      if (!name.isEmpty())
      {
        user.name = name;
      }
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'User updated! Please sign in again'});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userid = req.params.id;
  User.findById(userid)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      Blog.find();})
    .then(blogs=>{
      if (!blogs){
        return
      }
      for (const blogsByUser of blogs)
      {
        if (blogsByUser.creator.toString() === userid)
        {
          Blog.findByIdAndRemove(blogsByUser._id);
        }
      }
      Comment.find();})
    .then(comments=>{
      if (!comments){
        return User.findByIdAndRemove(userid);
      }
      for (const commentsByUser of comments)
      {
        if (commentsByUser.creator.toString() === userid)
        {
          Comment.findByIdAndRemove(commentsByUser._id);
        }
      }
      return User.findByIdAndRemove(userid);
    })
    .then(result => {
      res.status(200).json({ message: 'User deleted.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};



