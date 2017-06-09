const Sequelize = require("sequelize");
const path = require('path');

var db = {};

const sequelize = new Sequelize({
  username: "root",
  password: null,
  database: "burger_db",
  host: "127.0.0.1",
  dialect: "mysql",
  pool: {
    max: 1,
    min: 0,
    idle: 10000
  },
  sync: {
    force: false
  }
});

db.Burger = sequelize.import(path.join(process.cwd(), "./models/burger.js"));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
