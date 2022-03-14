const { listarProdutos } = require("./api-service");
const { CarrinhoDeCompras,formatarValor } = require("./objetos");
const carrinho = new CarrinhoDeCompras();
const {askQuestion} = require("./ask-question");

async function opacaoEscolhida(op){
  let produtoEscolhido, qtd, cupom, produtos;
  let totalCompra = 0;
  produtos = await listarProdutos();
  switch(op){
    case "1":
      console.log("Lista de Produtos: ");
      console.table(produtos);
    break;
    case "2":
      produtoEscolhido = await askQuestion("Informe o número do Produto:");
      produtoEscolhido = {...produtos[parseInt(produtoEscolhido)]};
      
      if(Object.keys(produtoEscolhido).length == 0){
        console.log("produto informado inválido");
        return;
      }
      qtd = await askQuestion("Informe a quantidade do Produto:");
      qtd = parseInt(qtd);
      if (!qtd) {
        console.error(`Quantidade inválida: ${qtd}`);
        return;
      }
      produtoEscolhido.quantidade = qtd;
      carrinho.incluirProduto(produtoEscolhido);
      console.table(carrinho);
      break;
    case "3":
      console.table(carrinho.listarProdutos());
      break;
    case "4":
      totalCompra = await carrinho.subtotal();
      cupom = await askQuestion("informe o cupom que deseja:");
      if(cupom.length === 0){
        console.log("O total da sua compra foi " + formatarValor(totalCompra));
        break;
      }
      carrinho.definirCupom(cupom.toUpperCase());
      totalCompra = await carrinho.total();
      console.log("O total da sua compra foi " + formatarValor(totalCompra));
      break;
    default:
    }
}

function menu(){
  console.log("1 - Listar Produtos");
  console.log("2 - Incluir produtos no carrinho");
  console.log("3 - Visualizar carrinho");
  console.log("4 - finalizar compra");
  console.log("x - sair");
  
}

async function run() {
  // TODO
  menu();
  let resposta;
  do{
    resposta = await askQuestion("Digite o número da opção desejada ou x para sair:");
    await opacaoEscolhida(resposta);
  }while(resposta.toUpperCase() !== "X");
  
}

if (require.main === module) {
  run();
}

module.exports = {
  menu,
  opacaoEscolhida,
};