const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define the Post model by extending the Sequelize Model class
class Post extends Model {}

// Initialize the Post model with column definitions and configuration
Post.init(
  {
    // Define the columns for the Post model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    // Pass in the imported sequelize connection
    sequelize,
    // Configure the model's options
    timestamps: true, // Enable timestamps
    freezeTableName: false, // Disable table name freezing
    underscored: true, // Use snake_case for automatically added attributes
    modelName: "post", // Set the model name
  }
);

// Export the Post model for use in other parts of the application
module.exports = Post;
