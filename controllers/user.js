const bcrypt = require('bcrypt');
const { models } = require('../models');

const userController = {
  signUp: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await models.User.create({ username, password: hashedPassword });
      res.redirect('/');
    } catch (error) {
      res.send('Error signing up');
    }
  },

  logIn: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await models.User.findOne({ where: { username } });
      if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = username;
        res.redirect('/');
      } else {
        res.send('Invalid credentials');
      }
    } catch (error) {
      res.send('Error logging in');
    }
  },

  logOut: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  }
};

module.exports = userController;
