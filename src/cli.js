const {listarProdutos, listarProdutosFormatados} = require("./api-service");

async function processarOpcao(opcao) {
  let retorno;
  console.log(`A opção digitada foi: ${opcao}`);
  switch (opcao.toUpperCase()) {
    case "PRODUTOS":
      retorno = await listarProdutos();
      break;
    case "PRODUTOS-FORMATADOS":
      retorno = await listarProdutosFormatados();
      break;
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
