const {
  listarProdutos,
  listarCategorias,
  listarPrecosFormatados,
  listarDescontoCategories
} = require("./api-service");

async function processarOpcao(opcao) {
  const [produtos, categorias, produtosFormatados, descontos] = 
    await Promise.all([
      listarProdutos(),
      listarCategorias(),
      listarPrecosFormatados(),
      listarDescontoCategories()
    ]);

    switch (opcao) {
      case "produtos":
        return produtos;
      case "categorias":
        return categorias;
      case "produtos-formatados":
        return produtosFormatados;
      case "descontos":
        return descontos;
      case undefined:
        throw new Error("Informe uma opção");
      default:
        throw new Error(`Opção inválida: ${opcao}`);
    }

  // return console.log(opcao);
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
