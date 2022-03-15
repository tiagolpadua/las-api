const { listarProdutos } = require("./api-service");
const { listarCategorias } = require("./api-service");
const { formatarValor } = require("./objetos");
const { obterDescontoCategoria } = require("./objetos");
jest.mock("node-fetch");
jest.mock("./api-service");
jest.mock("./cli");

async function processarOpcao(opcao) {
  let primeiraOpcao = "produtos";
  let segundaOpcao = "produtos-formatados";
  let terceiraOpcao = "categorias";
  let quartaOpcao = "descontos";
  let vazio = undefined;
  let todasOpcoes =
    "produtos" || "produtos-formatados" || "categorias" || "descontos";
  if (opcao == primeiraOpcao) {
    const lista = await listarProdutos();
    const p = lista;
    return p;
  } else if (opcao == segundaOpcao) {
    const lista = await listarProdutos();
    const data = lista;
    data.forEach((item) => (item.preco = formatarValor(item.preco)));
    return data;
  } else if (opcao == terceiraOpcao) {
    const listaCate = await listarCategorias();
    const listaCategoria = listaCate;
    return listaCategoria;
  } else if (opcao == quartaOpcao) {
    const lista = await listarProdutos();
    const data = lista;
    data.forEach((item) => (item.preco = formatarValor(item.preco)));
    data.forEach(
      (item) => (item.desconto = obterDescontoCategoria(item.categoria))
    );
    return data;
  } else if (opcao === vazio) {
    const informeOpcao = "Informe uma opção.";
    const erro = new Error(informeOpcao);
    throw erro;
  } else if (opcao !== todasOpcoes) {
    const opcaoInvalida = `Opção inválida: ${opcao}`;
    const errado = new Error(opcaoInvalida);
    throw errado;
  }
  console.log(opcao);
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
