const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "las",
  password: "admin",
  database: "las"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  conn.query("CREATE DATABASE las", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

module.exports = conn;