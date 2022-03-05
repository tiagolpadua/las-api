const {
  listarProdutos,
  listarCategoria,
} = require("./api-service");
const {obterDescontoCategoria} = require("./objetos");

async function processarOpcao(opcao) {
  // TODO
  opcao = opcaoEscolhida(opcao);
  return (opcao);
}

async function run() {
  const opcao = process.argv[2];
  const saida = await processarOpcao(opcao);
  console.table(saida);
}

if (require.main === module) {
  run();
}


async function produtoComDesconto(){
  const produto = await listarProdutos();
  produto.forEach(elemento => {
      let valor = obterDescontoCategoria(elemento.categoria);
      elemento.desconto = valor;
      elemento.preco = `${elemento.preco}`;
  });
  return produto;
}


async function produtosFormatado(){
  const produto = await listarProdutos();
  produto.forEach(elemento => elemento.preco = `${elemento.preco}`);
  return produto;
}


async function opcaoEscolhida(opcao){

  const verificaOpcao = {
      produtos: listarProdutos(),
      categorias: listarCategoria(),
      descontos: produtoComDesconto(),
      produtos_formatados: produtosFormatado(),
  };

  let opcaoFormatada = opcao.replace("-","_");

  if(!typeof opcao === "string" || opcao.length === 0){
      return opcao = "Informe uma opção.";
  }else if(verificaOpcao[opcaoFormatada]){
      return opcao = await verificaOpcao[opcaoFormatada];
  }else{
      return opcao = `Opção inválida: ${opcao}`;
  }
}

module.exports = {
  processarOpcao,
  opcaoEscolhida,
};
