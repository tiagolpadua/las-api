const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "las",
  password: "admin",
  database: "las",
});

module.exports = conn;

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';
// CREATE USER 'las'@'localhost' IDENTIFIED BY 'admin';
// GRANT ALL PRIVILEGES ON * . * TO 'las'@'localhost';
