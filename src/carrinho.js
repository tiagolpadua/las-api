/* const fetch = require("node-fetch");
const {listarProdutos, listarCategorias} = require("./api-service");

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
 */


async function run() {

}

if (require.main === module) {
  run();
}
