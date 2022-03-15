const {listarProdutos, listarProdutosFormatados, listarCategorias, produtoComDesconto} = require("./api-service");

async function processarOpcao(opcao) {
  let retorno;
  console.log(`A opção digitada foi: ${opcao}`);  
  
  switch (opcao) {
    case "produtos":
      retorno = await listarProdutos();
      break;
    case "produtos-formatados":
      retorno = await listarProdutosFormatados();
      break;
    case "categorias":
      retorno = await listarCategorias();
      break;
    case "descontos":
      retorno = await produtoComDesconto();
      break;
    case undefined:
      throw new Error("Informe uma opção.");
    default:
      throw new Error(`Opção Inválida: ${opcao}`);          
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
