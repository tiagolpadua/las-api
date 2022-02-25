const {
  opcaoEscolhida
} = require("./api-service");

async function processarOpcao(opcao) {
  opcao = opcaoEscolhida(opcao);
  // TODO
  return (opcao);
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
