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

async function run() {
  imprimirOpcoes();
}

if (require.main === module) {
  run();
}

function imprimirOpcoes() {
  console.log("Escolha uma opção:");
  console.log("1 - Liste os produtos");
  console.log("2 - Inclua um produto no carrinho");
  console.log("3 - Visualize o carrinho");
  console.log("4 - Finalize a compra e pergunte pelo cupom de desconto");
  console.log("x - Saia do sistema");
}