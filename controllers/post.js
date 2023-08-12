const { models } = require('../models');

const postController = {
  addPost: (req, res) => {
    const { title, content } = req.body;

    if (req.session.user) {
      models.BlogPost.create({
        title: title,
        content: content,
        author: req.session.user
      }).then(() => {
        res.redirect('/dashboard');
      }).catch(() => {
        res.send('Error adding post');
      });
    } else {
      res.redirect('/login');
    }
  },

  deletePost: (req, res) => {
    const title = req.params.title;

    if (req.session.user) {
      models.BlogPost.destroy({ where: { title, author: req.session.user } }).then(() => {
        res.redirect('/dashboard');
      }).catch(() => {
        res.send('Error deleting post');
      });
    } else {
      res.redirect('/login');
    }
  }
};

module.exports = postController;
