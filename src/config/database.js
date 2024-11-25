const { Sequelize } = require("sequelize");

// Konfigurasi database
const sequelize = new Sequelize("bookstore", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
