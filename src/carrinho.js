const { listarProdutos, listarCuponsValidos } = require("./api-service");


const readline = require("readline");

function askQuestion(query) {
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
}

let carrinho = [];
let carrinho2 = [];

function mostraOpcoes(){
  console.log("1 - Liste os produtos");
  console.log("2 - Inclua um produto no carrinho");
  console.log("3 - Visualize o carrinho");
  console.log("4 - Finalize a compra e pergunte pelo cupom de desconto");
  console.log("x - Saia do sistema");
}

async function processarOpcao(opcao) {
  let codigoProduto, produtos, produto, quantidade, descontoDe, total;
  switch(opcao){
    case "1":
      console.log("Lista de Produtos: ");
      console.table(await listarProdutos());
      break;
    case "2":
      codigoProduto = await askQuestion("Qual produto deseja incluir? Por favor digitar o códig. ");
      codigoProduto = parseInt(codigoProduto);
      produtos = await listarProdutos();
      produto = produtos[codigoProduto];
      if(!produtos){
        console.error(`Produto não localizado: ${codigoProduto}`);
      }
      quantidade = await askQuestion("Quantos produtos deseja incluir? ");
      quantidade = parseInt(quantidade);
      if(!quantidade){
        console.error(`Quantidade invalida ${quantidade}`);
      }
      carrinho.push({...produto, quantidade, valor: parseFloat(produto.preco*quantidade).toFixed(2).replace(".", ","), descontoDe,  total});
      if(quantidade && codigoProduto){
        console.log("Produto adicionado ao carrinho");
      }
      break;
    case "3":
      console.table(carrinho);
      break;
      
    case "4":
      console.table(await listarCuponsValidos());
      carrinho2 = carrinho;
      carrinho2.forEach((elemento) => {
        if(elemento.categoria === "Infantil"){
          let desc;
          desc = parseFloat(elemento.valor);
          elemento.total = parseFloat((desc-((desc*30)/100))).toFixed(2).replace(".", ","); 
          elemento.valor = parseFloat(elemento.valor);
          elemento.total = parseFloat(elemento.total);
          elemento.descontoDe = elemento.valor-elemento.total;

          // elemento.total = parseFloat(elemento.total).toFixed(2).replace(".", ",");
        }else if(elemento.categoria === "Alimentação"){
          let descc;
          elemento.total = parseFloat((descc-((descc*10)/100))).toFixed(2).replace(".", ","); 
          elemento.descontoDe = (elemento.valor-elemento.total);
          // elemento.total = parseFloat(elemento.total).toFixed(2).replace(".", ",");
          carrinho.push({...produto, total});
        }else{
          elemento.total = elemento.valor;
          elemento.descontoDe = 0;
          
        }
        
      });
     console.table(carrinho);
  }
}

async function run() {
  mostraOpcoes();

  let opcao;
  do{
    opcao = await askQuestion("Escolha uma opção: ");
    await processarOpcao(opcao);
  }while(opcao.toLowerCase().trim() !== "x");
}

if (require.main === module) {
  run();
}

module.exports = {
  mostraOpcoes,
  run,
};

