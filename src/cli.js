const {listarProdutos } = require("./api-service.js");



async function processarOpcao(opcao) {
  // TODO
  
  if(opcao === "produtos") return listarProdutos();
  
  console.log(opcao);
}

async function run() {
  const opcao = process.argv[2];
  const saida = await processarOpcao(opcao);
  console.table(saida);
}

if (require.main === module) {
  run();
}

module.exports = {
  processarOpcao,
};
