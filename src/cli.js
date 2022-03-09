const { listarProdutos, listarCategorias } = require("./api-service");
const {incluirPrecoFormatado, obterDescontoCategoria} = require("./objetos");


async function processarOpcao(opcao) {
  const listaDeProdutos = await listarProdutos();
  const listaDeCategorias = await listarCategorias();
  
  switch (opcao){
    case "produtos":
        return listaDeProdutos;

    case "produtos-formatados":
        return listaDeProdutos.map((list) =>{
          let produtosAtt = incluirPrecoFormatado(list);
          produtosAtt["preco"] = produtosAtt["preco-formatado"];
          delete produtosAtt.precoFormatado;
          
          return produtosAtt;
        });
    
    case "categorias":
        return listaDeCategorias;

    case "descontos":
        return listaDeProdutos.map((list) =>{
          let produtosAtt = incluirPrecoFormatado(list);
          produtosAtt["preco"] = produtosAtt["preco-formatado"];
          produtosAtt["desconto"] =  obterDescontoCategoria(produtosAtt["categoria"]);
          delete produtosAtt.precoFormatado;

          return produtosAtt;
        });

    case undefined:
          throw new Error("Informe uma opção.");
    
    default:
          throw new Error(`Opção invalida: ${opcao}`);
  }
}

/*async function run() {
  const opcao = process.argv[2];
  const saida = await processarOpcao(opcao);
  console.table(saida);
}

if (require.main === module) {
  run();
}*/


module.exports={
  processarOpcao
};