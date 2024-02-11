const { Sequelize } = require("sequelize");

// PostgreSQL database connection URI from ElephantSQL
const POSTGRESQL_DB_URI =
  "postgres://wpymnoqe:ro2jBOlp8TeBwKcIWgicy935g1m3Kgrg@bubble.db.elephantsql.com/wpymnoqe";

// Create a new Sequelize instance
const sequelize = new Sequelize(POSTGRESQL_DB_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // Set to true if using SSL connection
    },
  },
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
