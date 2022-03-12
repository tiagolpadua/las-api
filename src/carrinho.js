const { listarProdutos } = require("./api-service");
const { askQuestion } = require("./ask-question");
const { formatarPreco }  = require("./cli");

let carrinho = [];

function mostraOpcoes(){
  console.log("Escolha uma opção:");
  console.log("1 - Listar produtos");
  console.log("2 - Incluir produto no carrinho");
  console.log("3 - Visualizar carrinho");
  console.log("4 - Finalizar compra");
  console.log("x - Sair");
}

async function processarOpcao(opcao) {
  let codigoProduto, produtos, produto, quantidade, desconto, subtotal = 0, total = 0, calcInfantil = 0, calclAlimentcao = 0, calcBedida = 0, cupom, aux;
  switch(opcao){
    case "1":
      console.log("Lista de Produtos");
      console.table(await listarProdutos());
      break;
    case "2":
      codigoProduto = await askQuestion("Qual produto deseja incluir? Por favor digitar o codigo. ");
      codigoProduto = parseInt(codigoProduto);
      produtos = await listarProdutos();
      produto = produtos[codigoProduto];
     
      quantidade = await askQuestion("Quantos produtos deseja incluir? ");
      quantidade = parseInt(quantidade);
      
      carrinho.push({...produto, desconto, quantidade, valor: parseInt(produto.preco*quantidade)});
      if(quantidade && produto){
        console.log("Produto adicionado ao carrinho");
      }
      carrinho.forEach((elemento) => {
        if(elemento.categoria === "Infantil"){        
          elemento.desconto = 15;
          calcInfantil += elemento.valor;
        }else if(elemento.categoria === "Alimentação"){    
          elemento.desconto = 30; 
          calclAlimentcao += elemento.valor; 
        }else if(elemento.categoria === "Bebida"){
          elemento.desconto = 0;  
          calcBedida += elemento.valor;
        }      
      });
      break;
    case "3":
      console.log("Carrinho de Compras");
      console.table(carrinho);
      break;   
    case "4":
      // calcInfantil = parseInt(calcInfantil)
      // carrinho.forEach((elemento) => {
      //   if(elemento.categoria === "Infantil"){   
      //     if(elemento.quantidade > 0){     
      //       calcInfantil += elemento.valor;
      //     }
      //   }else if(elemento.categoria === "Alimentação"){    
      //     if(elemento.quantidade > 0){ 
      //       calclAlimentcao += elemento.valor; 
      //     }
      //   }else if(elemento.categoria === "Bebida"){
      //     if(elemento.quantidade > 0){ 
      //       calcBedida += elemento.valor;
      //     }  
      //   }        
      // });
      subtotal = calcInfantil+calclAlimentcao+calcBedida;
      aux = subtotal;
      subtotal = formatarPreco(subtotal);
      calcInfantil = (calcInfantil-((calcInfantil*15/100)));
      calclAlimentcao = (calclAlimentcao-((calclAlimentcao*15/100)));
      total = calcBedida+calcInfantil+calclAlimentcao;

      console.log("Concluir compra:");  
      console.table(carrinho);

      cupom = await askQuestion("Digite o cupom: ");
      if(cupom === "ALURANU" || cupom === "NULABSSA"){
        console.log(`Subtotal: R$ ${subtotal}`);
        console.log(`Qual nome do cupom? ${cupom}`);
        console.log("Qual o desconto do cupom? 10");
        total = aux-((aux*10)/100);
        total = formatarPreco(total);
        console.log(`Total: R$ ${total}`);
      }
  }
}

async function run() {
  mostraOpcoes();
  let opcao;
  do{
    opcao = await askQuestion("Escolha uma opção:");
    await processarOpcao(opcao);
  }while(opcao.toLowerCase().trim() !== "x");
}

if (require.main === module) {
  run();
}

module.exports = {
  mostraOpcoes,
  run,
  processarOpcao,
};