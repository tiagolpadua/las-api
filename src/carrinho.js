const { GET } = require("./api-service");
const { formatarPrecoProdutos } = require("./cli");
const readline = require("readline");

const carrinhoDeCompras = [];

const askQuestion = function (query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
};

const exibirMenu = function () {
  console.log("Escolha uma opção:");
  console.log("1 - Listar Produtos");
  console.log("2 - Incluir Produto no Carinho");
  console.log("3 - Visualizar Carrinho");
  console.log("4 - Finalizar Compra");
  console.log("5 - Sair");
};

const processarOpcao = async function (opcao) {
  let escolhaProduto;
  switch (opcao) {
    case "1":
      console.table(await GET("produtos"));
      break;
    case "2": {
      escolhaProduto = await askQuestion("Qual produto você deseja incluir ?");
      const produtos = await GET("produtos");
      const produto = produtos[escolhaProduto];
      if(!produto){
        console.error(`O produto escolhido não existe:${escolhaProduto}`);

      }
    }
      break;
    default:
      "thats an error";
      break;
  }
};

async function run() {
  exibirMenu();
  let opcao;
  do {
    opcao = await askQuestion("Escolha uma opção: ");
    processarOpcao(opcao);
  } while (opcao !== 5);
}

if (require.main === module) {
  run();
}

module.exports = { exibirMenu, processarOpcao };
