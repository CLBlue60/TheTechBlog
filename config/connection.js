// Imports the Sequelize library
const Sequelize = require("sequelize");
// Utilizes the 'dotenv' package in order to load the .env file and sets the environment variables to the process.env object.
require("dotenv").config();

let sequelize;
// Checks if the app is deployed.
// Uses DB_URL if available, else uses local env variables.
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Database user
    process.env.DB_PASSWORD, // Database password
    {
      host: "localhost", // Database host
      dialect: "postgres", // Dialect for PostgreSQL
    }
  );
}

module.exports = sequelize; // Exports Sequelize instance for use in other modules
