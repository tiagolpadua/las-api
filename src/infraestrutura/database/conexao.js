const mysql = require("mysql");

const DBHOST = process.env.DBHOST;
const DBPORT = process.env.DBPORT;
const DBUSER = process.env.DBUSER;
const DBPASS = process.env.DBPASS;
const DBNAME = process.env.DBNAME;

const pool = mysql.createPool({
  connectionLimit: 100,
  host: DBHOST || "localhost",
  port: DBPORT || 3306,
  user: DBUSER || "las",
  password: DBPASS || "admin",
  database: DBNAME || "las",
});

module.exports = pool;
