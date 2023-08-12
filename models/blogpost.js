module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // Make sure the foreign key is correctly defined
    author: {
      type: DataTypes.INTEGER, // Assuming your User id column is of type INTEGER
      allowNull: false,
      references: {
        model: 'Users',  // Make sure it's capitalized and matches the table name in the database
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return BlogPost;
};
