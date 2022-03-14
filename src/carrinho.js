// const readline = require("readline");

// function askQuestion(query) {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   return new Promise((resolve) =>
//     rl.question(query, (ans) => {
//       rl.close();
//       resolve(ans);
//     })
//   );
// }

// function imprimirOpcoes() {
//   console.log("Escolha uma opção:");
//   console.log("1 - Listar produtos");
//   console.log("2 - Incluir produto no carrinho");
//   console.log("3 - Visualizar carrinho");
//   console.log("4 - Finalizar compra");
//   console.log("x - Sair");
// }


// async function run() {
  
//   imprimirOpcoes();

//   let opcao = await askQuestion("Escolha uma opção: ");
  
// }

// if (require.main === module) {
//   run();
// }

// module.exports = {
//   imprimirOpcoes
// };