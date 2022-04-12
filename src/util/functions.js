const fs = require("fs");
const path = require("path");

const getQueries = (callback) => {
  fs.readdir(process.cwd() + "/sql", (err, files) => {
    if (err) throw err;

    const sqlQueries = files
      .filter((file) => path.extname(file) === ".sql")
      .map((file) =>
        fs.readFileSync(`${process.cwd()}/sql/${file}`).toString()
      );

    callback(sqlQueries);
  });
};

module.exports = getQueries;
