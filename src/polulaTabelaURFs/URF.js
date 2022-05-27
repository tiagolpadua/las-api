const repositorio = require("../repositorios/URFs");

const fs = require("fs");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("ufs.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function (data) {
    csvData.push(data);
  })
  .on("end", function () {
    csvData.shift();

    repositorio.incluirURFs(csvData);
  });
stream.pipe(csvStream);
