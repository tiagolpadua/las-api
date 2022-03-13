const readline = require("readline");
const { processarOpcao } = require("./cli.js");
const { listaCuponsValidos } = require("./api-service.js");

const carrinho = {};
const options = [
  "============= Selecione uma opção =============",
  "1 - Listar todos os produtos",
  "2 - Adicionar produto ao carrinho",
  "3 - Exibir produtos do carrinho",
  "4 - Finalizar compra",
  "x - Sair do sistem",
  "================================================"
];

const formatarPreco = preco => preco
  .toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  });  

const calcularPrecoComDesconto = (produto, categorias) =>  {
  const { desconto }  = categorias
  .find(({ nome }) => nome === produto.categoria ) || {};

  if (desconto) {
    const { preco } = produto;
    return preco - preco * desconto/100;
  }
};

const checarSeProdutoNoCarrinho = produto => carrinho[produto.nome];

const adicionarProdutoCarrinho = (produto, categorias) => {
  if (checarSeProdutoNoCarrinho(produto)) {
    carrinho[produto.nome].quantidade++;
    return true;
  }

  carrinho[produto.nome] = {
    ...produto,
    quantidade: 1,
    precoComDesconto: calcularPrecoComDesconto(produto, categorias) || produto.preco
  };
  return true;
};

function runCli() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  console.log(options.join("\n"));
  
  rl.on("line", async function(line) {
    switch(line.trim()) {
      case "1":
        return console.table(await processarOpcao("produtos-formatados"));

      case "2":
        rl.question("Digite o nome do produto desejado: ", async produtoSelecionado => {   
          const listaProdutos = await processarOpcao("produtos");
          const categorias = await processarOpcao("categorias");
          const dadosProdutoSelecionado = listaProdutos.find(produto => produto.nome === produtoSelecionado);
          
          let feedback;

          !dadosProdutoSelecionado 
            ? feedback = "Produto inválido. Verifique se o nome foi escrito corretamente"
            : (adicionarProdutoCarrinho(dadosProdutoSelecionado, categorias),
              feedback = `${dadosProdutoSelecionado.nome} adicionado(a) ao carrinho!`);
          
          return console.log(feedback);
        });
        break;

      case "3":
        return console.table(carrinho);

      case "4":
        rl.question("informe um cupom de desconto: ", async answer => {
          const cupons = await listaCuponsValidos();
          let totalParcial = Object.values(carrinho)
            .reduce((a, { precoComDesconto, quantidade }) => a + precoComDesconto * quantidade,0);

          if (!cupons.includes(answer.trim())) {
            return console.log("Cupom inválido. Total parcial: " + formatarPreco(totalParcial));
          }
          const totalComDesconto = totalParcial - totalParcial * 0.1;
          return console.log("Cupom aplicado. Valor à pagar: " + formatarPreco(totalComDesconto));
        });
      break;

      case "x": 
        console.log("Obrigado e tenha um bom dia!");
        return process.exit();
        
      default:
        return console.log("Opção inválida, tente novamente");
    }
    
  });
}

function run() {
  runCli();
}

if (require.main === module) {
  run();
}


























// // const readline = require("readline");

// // function askQuestion(query) {
// //   const rl = readline.createInterface({
// //     input: process.stdin,
// //     output: process.stdout,
// //   });

// //   return new Promise((resolve) =>
// //     rl.question(query, (ans) => {
// //       rl.close();
// //       resolve(ans);
// //     })
// //   );
// // }

// async function run() {
//   // TODO
// }

// if (require.main === module) {
//   run();
// }
