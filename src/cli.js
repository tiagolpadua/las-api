const {
  listarProdutos,
  listarCategoria,
  listarCupom,
} = require("./api-service");

async function processarOpcao(opcao) {
  if(opcao === "produtos"){
    opcao = await listarProdutos();
  }else if(opcao === "categorias"){
    opcao = await listarCategoria();
  }else if(opcao === "descontos"){
    opcao = await listarCupom();
  }else{
    return "opção inválida, por favor, coloque produto, categoria, cupom como opção.";
  }
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
