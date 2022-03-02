const { listarProdutos, listarCategoria} = require("./api-service");
const {incluirPrecoFormatado, obterDescontoCategoria} = require("./objetos");


async function processarOpcao(opcao){
  const listandoOsProdutos = await listarProdutos();
  const listandoAsCategorias = await listarCategoria();
  // TODO
  switch(opcao){
    //console.log(opcao);
    case "produtos": return listandoOsProdutos;

    case "produtos-formatados": 
    return listandoOsProdutos.map((i) => {
    let formatarValor = incluirPrecoFormatado(i);
    formatarValor["preco"] = formatarValor["precoFormatado"];
    delete formatarValor.precoFormatado;
    return formatarValor;
  });

  case "categorias": return listandoAsCategorias;

  case "descontos": return listandoOsProdutos.map((i) => {
    let formatarValor = incluirPrecoFormatado(i);
    formatarValor["preco"] = formatarValor["precoFormatado"];
    formatarValor["desconto"] = obterDescontoCategoria(formatarValor["categoria"]);
    delete formatarValor.precoFormatado;
    return formatarValor;
  });
  case undefined: throw new Error("Informe uma opção.");
  default: throw new Error(`Opção inválida: ${opcao}`);
} 
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
