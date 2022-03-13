#!/usr/bin/env node
const { 
  listarProdutos, listarCategorias,
 } = require("./api-service.js");
const { incluirPrecoFormatado } = require("./objetos.js");

 async function processarOpcao(opcao) {
   if (typeof opcao === "undefined") throw new Error("Informe uma opção.");
   let resultado;
   const categorias = await listarCategorias();
   const produtos = await listarProdutos();
   switch (opcao.toUpperCase()) {
      case "PRODUTOS":
        resultado = produtos;
        break;
      case "PRODUTOS-FORMATADOS":
        resultado = formatarPrecoProdutos(produtos);
        break;
      case "CATEGORIAS":
        resultado = await listarCategorias();
        break;
      case "DESCONTOS":
        resultado = produtos.map(prod => {
          const categoriaAtual = categorias.find(cat => cat.nome === prod.categoria);
          return {...prod, desconto: categoriaAtual ? categoriaAtual.desconto : 0};
        });
        break;
      default:
        throw new Error(`Opção inválida: ${opcao}`);
    }
    return resultado;
}

function formatarPrecoProdutos (produtos) {
  return produtos.map(p => incluirPrecoFormatado(p));
}

async function run() {
  const opcao = process.argv[2];
  const saida = await processarOpcao(opcao);
  console.table(saida);
}

if (require.main === module) {
  run();
}

module.exports = {
  processarOpcao,
};
