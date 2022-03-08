const {
  listarProdutos,
  listarCategorias,
  listarPrecosFormatados,
  listarDescontoCategorias
} = require("./api-service");

async function processarOpcao(opcao) {
  const [produtos, categorias, produtosFormatados, descontos] = 
    await Promise.all([
      listarProdutos(),
      listarCategorias(),
      listarPrecosFormatados(),
      listarDescontoCategorias()
    ]);

  let retorno;

  switch (opcao) {
    case "produtos":
      retorno = produtos;
      break;
    case "categorias":
      retorno = categorias;
      break;
    case "produtos-formatados":
      retorno = produtosFormatados;
      break;
    case "descontos":
      retorno = descontos;
      break;
    case undefined:
      throw new Error("Informe uma opção");
    default:
      throw new Error(`Opção inválida: ${opcao}`);
  }

  return retorno;
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
