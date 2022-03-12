const { listarProdutos, listarCategoria } = require("./api-service");

function formatarPreco(preco) {
  return `R$ ${parseFloat(preco).toFixed(2).toString().replace(".", ",")}`;
}

function formatarPrecoProdutos(listarProdutos) {
  let listaProdutosFormatados = JSON.parse(JSON.stringify(listarProdutos));
  listaProdutosFormatados.forEach((produto) => {
    produto.preco = formatarPreco(produto.preco);
  });
  return listaProdutosFormatados;
}


function adionaProdutosFormatados(listarProdutos, categoria){
  let listaProdutosformatados= JSON.parse(JSON.stringify(listarProdutos));
  listaProdutosformatados.forEach((produto) => {
    if(produto.categoria === "Infantil"){
      produto.desconto = categoria[0].desconto; 
    }else if(produto.categoria === "Alimentação"){
      produto.desconto = categoria[1].desconto;
    }else{
      produto.desconto = 0;
    }
  });
  return listaProdutosformatados;
}


async function processarOpcao(opcao) {
  let resultado;
  switch(opcao){
    case "produtos":
      resultado =  await listarProdutos();
      break;
    case "categorias":
      resultado = await listarCategoria();
      break;
    case "preco-formatado":
      return formatarPrecoProdutos(await listarProdutos());
    case "produtos-formatados":
      var produtosFormatados = formatarPrecoProdutos(await listarProdutos());
      var categoria = await listarCategoria();
      var produtosComDesconto = adionaProdutosFormatados(
        produtosFormatados,
        categoria
      );
      resultado =  produtosComDesconto;
      break;
    case undefined:
      throw new Error("Informe uma opção.");
    default:
      throw new Error(`Opção inválida: ${opcao}`);
  }
  return resultado;
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
  formatarPreco
};
