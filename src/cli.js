/* eslint-disable no-unreachable */

const { listarProdutos, listarCategorias} = require("./api-service");


async function processarOpcao(opcao) {

  switch(opcao){
    case "produtos": 
     return await listarProdutos();
    case "categorias": 
     return await listarCategorias();
    case "produtos_formatados":
      return formatarPrecosProdutos(await listarProdutos());
    case "descontos": 
    
      var produtosFormatados = formatarPrecosProdutos(await listarProdutos());
      var categorias = await listarCategorias();
      var produtosComDesconto = adicionaDescontoCategoria(produtosFormatados,categorias);

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

function formatarPrecosProdutos(listaProdutos){
  /* let listaProdutosFormatados = listaProdutos.slice();
  console.log(listaProdutos);
  console.log(listaProdutosFormatados); */
  let listaProdutosFormatados = JSON.parse(JSON.stringify(listaProdutos));
  listaProdutosFormatados.forEach((produto) => {
    produto.preco = formataPreco(produto.preco);
  });

  return listaProdutosFormatados;
}

function formataPreco(preco){
  return (
    "R$ " + (Math.round(preco * 100) / 100).toFixed(2).split(".").join(",")
  );
}

function adicionaDescontoCategoria(listaProdutos, categorias) {
  let listaProdutosComDesconto = JSON.parse(JSON.stringify(listaProdutos));
  listaProdutosComDesconto.forEach((produto) => {
    if (produto.categoria === "Infantil") {
      produto.desconto = categorias[0].desconto;
    } else if (produto.categoria === "Alimentação") {
      produto.desconto = categorias[1].desconto;
    } else {
      produto.desconto = 0;
    }
  });

  return listaProdutosComDesconto;
}


module.exports = {
  processarOpcao,
};
