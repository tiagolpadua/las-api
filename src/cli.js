const { listarProdutos, listarCategorias  } = require("./api-service");
const { formatarValor } = require("./objetos.js");

async function listarProdutosComDesconto(){
  let produtos = await listarProdutos();
  let categorias = await listarCategorias();
  return produtos.map(produto => {
    const categoria = categorias.find(categoria => produto.categoria === categoria.nome);
    produto.preco = formatarValor(produto.preco);
    return { ...produto, desconto: categoria?.desconto || 0};
  });
}

async function processarOpcao(opcao) {
  console.log(opcao);
  let retorno;
  let produtos;
  if (opcao === undefined){
    throw new Error("Informe uma opção.");
  } else {  
  switch (opcao.toUpperCase()) {
    case "PRODUTOS":
      retorno = await listarProdutos();
      break;
    case "PRODUTOS-FORMATADOS":      
      produtos = await listarProdutos();
      retorno = produtos.map(produto => {
        produto.preco = formatarValor(produto.preco);
        return { ...produto};
      });
      break;
    case "CATEGORIAS":
      retorno = await listarCategorias();
      break;
    case "DESCONTOS":
      retorno = await listarProdutosComDesconto();
      break;
    default:
      throw new Error(`Opção inválida: ${opcao}`); 
  }
  return retorno;
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
  processarOpcao
};
