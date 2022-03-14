const { listarProdutos } = require("./api-service");
const { askQuestion } = require("./ask-question");

const imprimirOpcoes = () => {
  console.log("Escolha uma opção:");
  console.log("1 - Listar produtos");
  console.log("2 - Incluir Produto no carrinho");
  console.log("3 - Visualizar carrinho");
  console.log("4 - Finalizar compra");
  console.log("x - Sair");
};

  let carrinho = [];

 const processarOpcao = async(opcao) => {
   let codProduto, produtos, produto, qtd;

  switch (opcao) {
    case "1":
      console.log("Lista de Produtos");
      console.table(await listarProdutos());
      break;
    case "2":
      codProduto = await askQuestion(
        "Qual o código do produto que deseja incluir no carrinho?"
      );
      codProduto = parseInt(codProduto);
      produtos = await listarProdutos();
      produto = produtos[codProduto];

      if(!produto){
        console.error(`Produto não localizado: ${codProduto}`);
        return;
      }

      qtd = await askQuestion(
        "Quantas unidades deseja adicionar ao carrinho?"
      );
      qtd = parseInt(qtd);

      if(!qtd){
        console.error(`Quantidade inválida: ${qtd}`);
        return;
      }

      carrinho[carrinho.length] = {...produto, qtd, valor: (produto.preco * qtd)};

      console.table(carrinho);
      break;
    case "3":
      break;
    case "4":
      break;
    default:
      break;
  }
};

async function run() {
  imprimirOpcoes();

  let opcao;

  do {
    opcao = await askQuestion("Escolha uma opção:");
    await processarOpcao(opcao);
  } while(opcao.toUpperCase() !== "X");

  console.log(opcao);
}

if (require.main === module) {
  run();
}

module.exports = {
  imprimirOpcoes,
  processarOpcao,

};

