const { listarProdutos, listarCategorias } = require("./api-service");
const { formatarValor } = require("./objetos");

async function processarOpcao(opcao) {
  // TODO
  console.log(`Opção: ${opcao}`);

  let categorias;
  let produtos;

  switch(opcao){
    case "produtos":
      return await listarProdutos();
    case "produtos-precos-formatados":
      return formatarPrecos(await listarProdutos());
    case "categorias":
      return await listarCategorias();
    case "descontos":
      produtos = formatarPrecos(await listarProdutos());
      categorias = await listarCategorias();
      return descontoCategoria(produtos,categorias);
    case undefined:
      throw new Error ("Informe uma opção.");
    default:
      throw new Error (`Opção inválida ${opcao}`);
  }
}


function formatarPrecos(produtos){
  for(let i=0; i< produtos.length; i++){
    produtos[i].preco = formatarValor(produtos[i].preco);
  }
  return produtos;
}

function descontoCategoria(produtos,categoria){
  for(let i = 0; i < produtos.length; i++){
    if(produtos[i].categoria === "Infantil"){
      produtos[i].desconto = categoria[0].desconto;
    }else if(produtos[i].categoria === "Alimentação"){
      produtos[i].desconto = categoria[1].desconto;
    }else{
      produtos[i].desconto = 0;
    }
  }
  return produtos;
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
  formatarPrecos
};
