const readline = require("readline");

function askQuestion(query) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    return new Promise((resolve) =>
      rl.question(query, async (ans) => {
        rl.close();
        resolve(ans);
      })
    );
  }

  module.exports = {askQuestion};