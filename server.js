const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// Set handlebars as the view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Configure session
const sess = {
  secret: "secret secret secret", // Secret for session
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // Session max age: 24 hours
    httpOnly: true, // HTTP only flag for cookies
    secure: false, // Not using HTTPS, set to false
    sameSite: "strict", // Strict same-site policy
  },
  resave: false, // Don't save session if unmodified
  saveUninitialized: true, // Save new sessions
  store: new SequelizeStore({
    db: sequelize, // Store session data in Sequelize database
  }),
};

// Middleware setup
app.use(session(sess)); // Session middleware
app.use(express.json()); // JSON parsing middleware
app.use(express.urlencoded({ extended: true })); // URL-encoded form data parsing middleware
app.use(express.static(path.join(__dirname, "public"))); // Static file serving middleware

app.use(routes); // Route middleware

// Sync Sequelize models and start Express app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
