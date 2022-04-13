const fs = require("fs");

const getQuery = (fileName) =>
  fs.readFileSync(`${process.cwd()}/src/sql/${fileName}.sql`).toString();

const solve = ([error, result], response, statusCode = 200) => {
  if (error) {
    console.log(error);
  }

  response.status(statusCode).json(result);
};

module.exports = { getQuery, solve };
