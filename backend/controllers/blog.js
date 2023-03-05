const { validationResult } = require('express-validator/check');
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  try {
    const totalItems = await Blog.find().countDocuments();
    const blogs = await Blog.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: 'Fetched posts successfully.',
      blogs: blogs,
      totalItems: totalItems
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPostsByUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blogs = await Blog.find();
    let blogsById = [];
    for (const blog1 of blogs)
      {
        if (blog1.creator.toString() === req.userId)
        {
          blogsById.push(blog1);
        }
      }
      if (blogsById.length == 0)
      {
        res.status(200).json({
          message: 'No posts by this user.',
          blogs: blogsById
        })
      }
      res.status(200).json({
        message: 'Fetched posts successfully by this user.',
        blogs: blogsById
      });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let creator;
  const blog = new Blog({
    title: title,
    content: content,
    creator: req.userId
  });
  blog
    .save()
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      creator = user;
      user.blogs.push(blog);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
        blog: blog,
        creator: { _id: creator._id, name: creator.name }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Blog.findById(postId)
    .then(blog => {
      if (!blog) {
        const error = new Error('Could not find blog.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Blog fetched.', blog: blog });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getComments = (req, res, next) => {
  const postId = req.params.id;
  Blog.findById(postId)
    .then(blog => {
      if (!blog) {
        const error = new Error('Could not find blog.');
        error.statusCode = 404;
        throw error;
      }
      Comment.find()
      .then(comments =>{
        const commentsArray = [];
        for (cArray of comments)
        {
          if (cArray.blog.toString() == blog._id)
          {
            commentsArray.push(cArray);
          }
        }
        if (cArray.length == 0)
        {
          res.status(200).json({ message: 'No comments', comments: commentsArray});
        }
        else
        {
          res.status(200).json({ message: 'Comments fetched.', comments: commentsArray});
        }
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  Blog.findById(postId)
    .then(blog => {
      if (!blog) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (blog.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      blog.title = title;
      blog.content = content;
      return blog.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Post updated!', blog: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Blog.findById(postId)
    .then(blog => {
      if (!blog) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      return Blog.findByIdAndRemove(postId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.blogs.pull(postId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Deleted post.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};



