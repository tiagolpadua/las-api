const { listarProdutos, listarCategorias } = require("./api-service");

function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function formatarPrecoProdutos(listaProdutos) {
  listaProdutos.forEach((produto) => {
    produto.preco = formatarPreco(produto.preco);
  });
  return listaProdutos;
}

function adionaCategoria(listaProdutos, categorias){
  let listaProdutosComDesconto = JSON.parse(JSON.stringify(listaProdutos));
  listaProdutosComDesconto.forEach((produto) => {
    if(produto.categoria === "Infantil"){
      produto.categoria = categorias[0].desconto;
    }else if(produto.categoria === "Alimentação"){
      produto.categoria = categorias[1].desconto;
    }else{
      produto.desconto = 0;
    }
  });
  return listaProdutosComDesconto;
}

async function processarOpcao(opcao) {
  // TODO
  switch(opcao){
    case 1 - "ListarProdutos":
      return await listarProdutos();
    case 2 -" ListarCategorias":
      return await listarCategorias();
    case 3 - "Produtos com preços formatados":
      return formatarPrecoProdutos(await listarProdutos());
    case 4 - "Produtos com preços formatodos e com desconto":
      var produtosFormatados = formatarPrecoProdutos(await listarProdutos());
      var categorias = await listarCategorias();
      var produtosComDesconto = adionaCategoria(
        produtosFormatados,
        categorias
      );
      return produtosComDesconto;
    case undefined:
      throw new Error("Informe uma opção.");
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
