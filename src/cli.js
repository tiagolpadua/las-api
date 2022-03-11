const { listarProdutos, listarCategorias } = require("./api-service");
const { formatarValor, obterDescontoCategoria } = require("./objetos");


function inserirProdutosFormatados(produtos) {
  for (let produto of produtos)
    produto.preco = formatarValor(produto.preco);

  return produtos;
}


function inserirDescontos(produtos) {
  for (let produto of produtos)
    produto.desconto = obterDescontoCategoria(produto.categoria);

  return produtos;
}



async function processarOpcao(opcao) {

  const produtos = await listarProdutos();
  let result;

  switch (opcao) {

    case "produtos-formatados":
      result = inserirProdutosFormatados(produtos);
      break;

    case "categorias":
      result = await listarCategorias();
      break;

    case "descontos":
      inserirProdutosFormatados(produtos);
      result = inserirDescontos(produtos);
      break;

    case "produtos": 
      result = produtos;
      break;

    case "":
      throw new Error("Informe uma opção");

    default:
      throw new Error(`Opção invalida: ${opcao}`);
  }

  return result;
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
  inserirDescontos
};
