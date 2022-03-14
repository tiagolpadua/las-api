const { listarProdutos } = require("./api-service");
const { askQuestion } = require("./ask-question");

function imprimirOpcoes() {
  console.log("Escolha uma opção:");
  console.log("1 - Listar produtos");
  console.log("2 - Incluir produto no carrinho");
  console.log("3 - Visualizar carrinho");
  console.log("4 - Finalizar compra");
  console.log("x - Sair");
}

function incluiDescontoProdutos(produtos) {

    let desconto;
    
     return produtos.map(item => {

        if(item.categoria === "Alimentação") desconto = 30;
        else if(item.categoria === "Infantil") desconto = 15;
        else desconto = 0;
        
        return {...item , desconto: desconto};
      });

}

let carrinho = [];



async function processarOpcao(opcao) {
  let codigoProduto, produtos, produto, quantidade, visalizaProdutoIncluidoCarrinho;
  const produtosComDesconto = incluiDescontoProdutos(await listarProdutos());
  let subtotal, digitarCupom, digitarDescontoCupom, total;

  switch (opcao) {
   
    case "1":
      console.log("Lista de Produtos");
      console.table(produtosComDesconto);
      break;
   
      case "2":
      codigoProduto = await askQuestion(
        "Qual código de produto deseja incluir no carrinho?"
      );
      codigoProduto = parseInt(codigoProduto);
      produtos = produtosComDesconto;
      produto = produtos[codigoProduto];

      if (!produto) {
        console.error(`Produto não localizado: ${codigoProduto}`);
        return;
      }

      quantidade = await askQuestion(
        "Quantas unidades deseja adicionar ao carrinho?"
      );
      quantidade = parseInt(quantidade);

      if (!quantidade) {
        console.error(`Quantidade inválida: ${quantidade}`);
        return;
      }

      visalizaProdutoIncluidoCarrinho = { ...produto, quantidade, valor: +((produto.preco * quantidade) * (1 - (produto.desconto/100))).toFixed(2) };

      carrinho.push(visalizaProdutoIncluidoCarrinho);

      console.table([visalizaProdutoIncluidoCarrinho]);
      console.log("Produto incluído com sucesso no carrinho.");
      
      break;
    
      case "3":

      console.log("Carrinho de Compras");

      console.table(carrinho);
     
      break;
      
      
      
      case "4":
        
        console.log("Concluir compra");
        console.table(carrinho);
        
        subtotal = carrinho.reduce((acc , item) => acc + item.valor , 0);
        
        console.log(`Subtotal: R$ ${subtotal.toFixed(2)}`);
        digitarCupom = await askQuestion("Qual o nome do cupom?");
        digitarDescontoCupom = await askQuestion("Qual o desconto do cupom?");

        if(digitarCupom.trim().toUpperCase() === "ALURANU" || digitarCupom.trim().toUpperCase() === "NULABSSA" ) {
          
          total = subtotal * (1 - +(digitarDescontoCupom.trim()/100));
        }else{

          total = subtotal;
            
        }

        console.log(`Total: R$ ${total.toFixed(2)}`);
        console.log("Compra finalizada com sucesso!");



      break;

      default:

      if(opcao.toUpperCase() !== "X") console.log("Digite uma opção válida!");
      
      break;
  }

  if (require.main === module && opcao.toUpperCase() !== "X")  imprimirOpcoes();
}



async function run() {
  
  imprimirOpcoes();
  
  let opcao;
  
  do {
    opcao = await askQuestion("Opção:");
    await processarOpcao(opcao);
  } while (opcao.toUpperCase() !== "X");
}



if (require.main === module) {
  run();
}

module.exports = {
  imprimirOpcoes,
  processarOpcao,
  carrinho
};