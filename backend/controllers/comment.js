// const { validationResult } = require('express-validator/check');
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const blog = require('../models/blog');

exports.createComment = (req, res, next) => {
    const id = req.params.id;
    const content = req.body.content;
    let creator;
    Blog.findById(id)
    .then(blog =>{
        const comment = new Comment({
            content: content,
            blog: id,
            creator: req.userId
    })
    comment
    .save()
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      creator = user;
      user.comments.push(comment);
      return user.save();
    })
    .then(blog =>{
      return Blog.findById(id)
    })
    .then(blog=>{
      blog.comments.push(comment);
      return blog.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Comment posted successfully!',
        comment: comment,
        creator: { _id: creator._id, name: creator.name }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
})};

exports.getCommentsById = (req, res, next) => {
  const postId = req.params.postid;
  const commentId = req.params.id;
  Blog.findById(postId)
    .then(blog => {
      if (!blog) {
        const error = new Error('Could not find blog.');
        error.statusCode = 404;
        throw error;
      }
      Comment.findById(commentId)
      .then(comment=>{
        if (!comment) {
          const error = new Error('No comments on this blog.');
          error.statusCode = 404;
          throw error;
        }
        else if (comment.blog == blog.comments)
        {
          const error = new Error('Specified ID comment is not on this blog.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: 'Comment fetched.', comment: comment});
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateComment = (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const content = req.body.content;
  
  Blog.findById(postId)
    .then(blog => {
      if (!blog) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      Comment.findById(commentId)
      .then(comment=>{
        if (comment.creator.toString() !== req.userId)
        {
          const error = new Error('You are not authorized to edit this post');
          error.statusCode = 403;
          throw error;
        }
        comment.content = content;
        res.status(200).json({ message: 'Comment updated!'});
        return comment.save();
      })
    })
    .then(result => {
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  
  Blog.findById(postId)
    .then(blog => {
      if (!blog) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      Comment.findById(commentId)
      .then(comment=>{
        if (comment.creator.toString() !== req.userId) {
          const error = new Error('Not authorized!');
          error.statusCode = 403;
          throw error;
        }
        return Comment.findByIdAndRemove(commentId);
      })
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.comments.pull(commentId);
      return user.save();
    })
    .then(result => {
      return Blog.findById(postId);
    })
    .then(blog => {
      blog.comments.pull(commentId);
      return blog.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Comment deleted succesfully.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};



