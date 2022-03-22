const readline = require("readline");
const { processarOpcao, CarrinhoDeCompras } = require("./cli.js");

function askQuestion() {
  const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout,
  });


    



      // rl.close();
      // resolve(ans);
    });
  
 }

async function run() {
  askQuestion();
}

if (require.main === module) {
  run();
}
