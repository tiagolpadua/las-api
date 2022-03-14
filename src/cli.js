const { listarProdutos } = require("./api-service"); 

async function processarOpcao(opcao) {
  switch (opcao.toUpperCase()) {
    case "PRODUTOS":
      return await listarProdutos();
    default:
      throw new Error(`Opção inválida: ${opcao}`);
  }
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
