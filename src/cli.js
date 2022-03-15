const {
  listarProdutos,
  listarCategoria,
  tableFormatPrice,
  listarDescCategoria
} = require("./api-service");

async function processarOpcao(opcao) {
  try {
    var [produtos, categorias, produtosFormatados, descontos] =
    await Promise.all([listarProdutos(), listarCategoria(), tableFormatPrice(), listarDescCategoria()]);
  } catch (err){
    console.error(err.message);
  }
  

  // switch (opcao) {
  //   case "produtos":
  //     return produtos;
  //   case "categorias":
  //     return categorias;
  //   case "produtos-formatados":
  //     return produtosFormatados;
  //   case "descontos":
  //     return descontos;
  //   case undefined:
  //     throw new Error("Informe uma opção");
  //   default:
  //     throw new Error(`Opção inválida: ${opcao}`);
  // }

  if ((opcao) === "produtos") {
    return produtos;
  }
  if ((opcao) === "categorias") {
    return categorias;
  }
  if ((opcao) === "descontos") {
    return descontos;
  }
  if ((opcao) === "produtos-formatados") {
    return produtosFormatados;
  }
  if ((opcao) === undefined) {
    throw new Error("Informe uma opção");
  }
  else {
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
