const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("snacktec", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
