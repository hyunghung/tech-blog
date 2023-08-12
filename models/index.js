const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

// Import your individual model definitions
const User = require('./user')(sequelize, Sequelize);
const BlogPost = require('./blogpost')(sequelize, Sequelize);

// Define model associations
User.hasMany(BlogPost, { foreignKey: 'author' });
BlogPost.belongsTo(User, { foreignKey: 'author' });

// Export the models
module.exports = {
  User,
  BlogPost
};
