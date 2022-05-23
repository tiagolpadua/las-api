const repositorio = require("../repositorios/URFs");

// importar csv
const fs = require("fs");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("municipios.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function (data) {
    csvData.push(data);
  })
  .on("end", function () {
    // remove the first line: header
    csvData.shift();

    // open the connection
    repositorio.incluirMunicipios(csvData);
  });
stream.pipe(csvStream);
