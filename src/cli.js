const {listarProdutos, listarCategorias} = require ("./api-service");
const {incluirPrecoFormatado, obterDescontoCategoria} = require("./objetos");

async function processarOpcao(opcao) {
  const listaProdutos = await listarProdutos();
  const listaCategorias = await listarCategorias();
  // TODO

  switch(opcao){
    case "produtos":
      return listaProdutos;

    case "produtos-formatados":
      return listaProdutos.map( (product)=> {
        let formatarValor = incluirPrecoFormatado(product);
        formatarValor["preco"] = formatarValor["precoFormatado"];
        delete formatarValor.precoFormatado;
        return formatarValor;
      });
    
      case "categorias":
        return listaCategorias;

      case "descontos":
        return listaProdutos.map((product) => {
          let formatarValor = incluirPrecoFormatado(product);
          formatarValor["preco"] = formatarValor["precoFormatado"];
          formatarValor["desconto"] = obterDescontoCategoria(formatarValor["categoria"]);
          delete formatarValor.precoFormatado;
          return formatarValor;
        });

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
