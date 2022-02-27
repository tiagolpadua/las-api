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
    
  }


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
