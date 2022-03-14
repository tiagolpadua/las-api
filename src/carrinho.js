const { listarProdutos, listarCategorias } = require("./api-service");
const { askQuestion } = require("./ask-question");

function imprimirOpcoes() {
  console.log("Escolha uma opção:");
  console.log("1 - Listar produtos");
  console.log("2 - Incluir produto no carrinho");
  console.log("3 - Visualizar carrinho");
  console.log("4 - Finalizar compra");
  console.log("x - Sair");
}

let carrinho = [];
let opcaoInicial;

async function processarOpcao(opcao) {
  let codProduto, produtos, produto, qtd, temCupom, cupom, produtosComDesconto;
  let categorias;
  let total = 0;
  let totalComDesconto = 0;
  let desconto = 0;

  switch (opcao) {
    case "1":
      console.log("Lista de Produtos");
      console.table(await listarProdutos());
      break;
    case "2":
      codProduto = await askQuestion(
        "Qual código de produto deseja incluir no carrinho?"
      );
      codProduto = parseInt(codProduto);
      produtos = await listarProdutos();
      categorias = await listarCategorias();
      produtosComDesconto = await produtos.map((p) => {
        const categoria = categorias.find((c) => p.categoria === c.nome);
        return {...p, desconto: categoria?.desconto || 0};
      }); 
      produto = produtosComDesconto[codProduto];

      if (!produto) {
        console.error(`Produto não localizado: ${codProduto}`);
        return;
      }

      qtd = await askQuestion(
        "Quantas unidades deseja adicionar ao carrinho?"
      );
      qtd = parseInt(qtd);

      if (!qtd) {
        console.error(`Quantidade inválida: ${qtd}`);
        return;
      }

      carrinho.push({ ...produto, qtd, valor: produto.preco * qtd });

      console.table(carrinho);
      break;
    case "3":
      console.table(carrinho);
      break;
    case "4":
      console.table(carrinho);
      total = aplicaDesconto(carrinho);
      console.log(`O subtotal da sua compra é ${total}`);
      temCupom = await askQuestion(
        "Deseja aplicar cupom de desconto?(sim ou não):"
      );
      if(temCupom.toUpperCase() === "SIM"){
        cupom = await askQuestion(
          "Digite o cupom de desconto:"
        );
        if(cupom === "NULABSSA" || cupom === "ALURANU"){
          desconto = await askQuestion(
            "Digite a quantidade de desconto:"    
          );
          desconto = parseInt(desconto);
          if(!desconto){
            console.log("Quantidade inválida.");
            totalComDesconto = total;
          } else{
            totalComDesconto = total - (total/100 * desconto);
          }
        } else{
          console.log("Cupom inválido");
          totalComDesconto = total;
        }
      }else {
        totalComDesconto = total;
      }
      console.clear();
      console.log(`O total da sua compra ${totalComDesconto}`);
      console.log("Compra finalizada");
      opcaoInicial = "x";
      break;  
    default:
      console.log("Opção inválida!");
      break;
  }
}

function aplicaDesconto(carrinho) {
  let total = 0;
  for (let item of carrinho) {
    if (item.categoria === "Infantil") {
      item.valor -= item.valor / 100 * 15;
    }
    if (item.categoria === "Alimentação") {
      item.valor -= item.valor / 100 * 30;
    }
    total = total + item.valor;
  }
  return total;
}

async function run() {
  imprimirOpcoes();
  do {
    opcaoInicial = await askQuestion("Escolha uma opção:");
    await processarOpcao(opcaoInicial);
  } while (opcaoInicial.toUpperCase() !== "X");
}

if (require.main === module) {
  run();
}
module.exports = {
  imprimirOpcoes,
  processarOpcao,
  aplicaDesconto
};

