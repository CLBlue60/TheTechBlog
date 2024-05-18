const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// Define the User model by extending the Sequelize Model class
class User extends Model {
  // Method to check if the provided password matches the stored encrypted password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with column definitions and configuration
User.init(
  {
    // Define the columns for the User model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Minimum length for password
      },
    },
  },
  {
    // Hooks to hash the password before creating or updating a user
    hooks: {
      // Hash the password before creating a new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash the password with bcrypt
        return newUserData;
      },
      // Hash the password before updating an existing user
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        ); // Hash the password with bcrypt
        return updatedUserData;
      },
    },
    // Pass in the imported sequelize connection
    sequelize,
    // Configure the model's options
    timestamps: false, // Disable timestamps
    freezeTableName: false, // Disable table name freezing
    underscored: true, // Use snake_case for automatically added attributes
    modelName: "user", // Set the model name
  }
);

// Export the User model for use in other parts of the application
module.exports = User;
