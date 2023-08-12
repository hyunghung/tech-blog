const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const postController = require('../controllers/post');
const models = require('../models');

router.get('/', async (req, res) => {
  try {
    let renderedView;

    if (req.session.user) {
      const userBlogPosts = await models.BlogPost.findAll({
        where: { author: req.session.user }
      });

      renderedView = res.render('dashboard', { userBlogPosts });
    } else {
      const blogPosts = await models.BlogPost.findAll();
      renderedView = res.render('home', { blogPosts });
    }

    return renderedView;
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('An error occurred');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/newpost', (req, res) => {
  if (req.session.user) {
    res.render('newpost');
  } else {
    res.redirect('/login');
  }
});
router.get('/signup', (req, res) => {
  res.render('signup.handlebars'); // Specify the correct view filename
});
router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.get('/logout', userController.logOut);
router.post('/addpost', postController.addPost);
router.post('/deletepost/:title', postController.deletePost);

module.exports = router;
