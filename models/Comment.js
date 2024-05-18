const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create the Comment model by extending the Sequelize Model class
class Comment extends Model {}

// Initialize the Comment model with column definitions and configuration
Comment.init(
  {
    // Define the columns for the Comment model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Foreign key that references the User model's id
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    // Foreign key that references the Post model's id
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "posts",
        key: "id",
      },
    },
  },
  {
    // Pass in the imported sequelize connection
    sequelize,
    // Configure the model's options
    timestamps: true, // Enable timestamps
    freezeTableName: false, // Disable table name freezing
    underscored: true, // Use snake_case for automatically added attributes
    modelName: "comment", // Set the model name
  }
);

// Export the Comment model for use in other parts of the application
module.exports = Comment;
