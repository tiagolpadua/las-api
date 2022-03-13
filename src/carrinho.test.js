const { exibirOpcoes, processarOpcao } = require("./carrinho.js");
const { listarProdutos } = require("./api-service");
jest.mock("./api-service");
const PRODUTOS_MOCK = require("../mocks/produtos.json");
const { askQuestion } = require("./ask-question.js");
jest.mock("./ask-question.js");

describe("Desafio", () => {
  // Crie uma interface com testes em linha de comandos que:
  // 1 - Liste os produtos
  // 2 - Inclua um produto no carrinho
  // 3 - Visualize o carrinho
  // 4 - Finalize a compra e pergunte pelo cupom de desconto
  // x - Saia do sistema

  test("Deve exibir as opções.", () => {
    console.log = jest.fn();
    exibirOpcoes();
    expect(console.log.mock.calls).toEqual([["1 - Liste os produtos"], ["2 - Inclua um produto no carrinho"], ["3 - Visualize o carrinho"], ["4 - Finalizar a compra"], ["x - Saia do sistema"]]);
  });

  test("Deve listar os produtos ao digitar opção 1.", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    await processarOpcao("1");
    expect(console.log.mock.calls).toEqual([["Lista de produtos:"]]);
    expect(console.table.mock.calls).toEqual([[[{"categoria": "Infantil", "nome": "Confete", "preco": 30}, {"categoria": "Infantil", "nome": "Serpentina", "preco": 10}, {"categoria": "Bebida", "nome": "Cerveja", "preco": 7}, {"categoria": "Bebida", "nome": "Refrigerante", "preco": 8}, {"categoria": "Alimentação", "nome": "Fruta", "preco": 12}]]]);
  });

  test("Deve incluir os produtos ao digitar opção 2 e exibir o carrinho ao digitar opção 3.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("2");
    await processarOpcao("2");
    await processarOpcao("3");
    expect(console.table.mock.calls).toEqual([[[{"categoria": "Bebida", "nome": "Cerveja", "preco": 7, "quantidade": 2, "valor": 14}]]]);
  });

  test ("Deve finalizar a compra", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("4");
    askQuestion.mockResolvedValueOnce("2");
    await processarOpcao("2");
    askQuestion.mockResolvedValueOnce("NULABSSA");
    await processarOpcao("4");
    expect(console.log.mock.calls).toEqual([["Subtotal: 38"], ["Total da compra com descontos: 34.4"]]);
  });

  test ("Deve exibir erro quando produto for inválido.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.error = jest.fn();
    askQuestion.mockResolvedValueOnce("99");
    await processarOpcao("2");
    expect(console.error.mock.calls).toEqual([["Produto não encontrado: 99"]]);
  });

  test ("Deve exibir erro quando não for informada quantidade.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.error = jest.fn();
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("  ");
    await processarOpcao("2");
    expect(console.error.mock.calls).toEqual([["Quantidade inválida: NaN"]]);
  });
});