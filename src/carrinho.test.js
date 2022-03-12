const { mostraOpcoes, processarOpcao} = require("./carrinho");

const { askQuestion } = require("./ask-question");
jest.mock("./ask-question");

const { listarProdutos } = require("./api-service");
jest.mock("./api-service");

const PRODUTOS_MOCK = require("../mocks/produtos.json");

describe("Desafio", () => {
  // Crie uma interface com testes em linha de comandos que:
  // 1 - Liste os produtos
  // 2 - Inclua um produto no carrinho
  // 3 - Visualize o carrinho
  // 4 - Finalize a compra e pergunte pelo cupom de desconto
  // x - Saia do sistema

  test("Deve imrpimir as opções.", () => {
    console.log = jest.fn();
    mostraOpcoes();
    expect(console.log.mock.calls).toEqual([["Escolha uma opção:"], ["1 - Listar produtos"], ["2 - Incluir produto no carrinho"], ["3 - Visualizar carrinho"], ["4 - Finalizar compra"], ["x - Sair"]]);
  });

  test("Deve imprimir a lista de produtos.", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    await processarOpcao("1");
    expect(console.log.mock.calls).toEqual([["Lista de Produtos"]]);
    expect(console.table.mock.calls).toEqual([[[{ "categoria": "Infantil", "nome": "Confete", "preco": 30 }, { "categoria": "Infantil", "nome": "Serpentina", "preco": 10 }, { "categoria": "Bebida", "nome": "Cerveja", "preco": 7 }, { "categoria": "Bebida", "nome": "Refrigerante", "preco": 8 }, { "categoria": "Alimentação", "nome": "Fruta", "preco": 12 }]]]);
  });

  test("Deve incluir produtos no carrinho quando digitar 2", async() => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("2");
    await processarOpcao("2");
    expect(console.log.mock.calls).toEqual([["Produto adicionado ao carrinho"]]);
  });

  test("Deve mostrar o carrinho.", async() => {
    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("3");
    askQuestion.mockResolvedValueOnce("3");
    await processarOpcao("3");
    expect(console.log.mock.calls).toEqual([["Carrinho de Compras"]]);
    expect(console.table.mock.calls).toEqual([[[{"categoria": "Bebida", "desconto": 0, "nome": "Cerveja", "preco": 7, "quantidade": 2, "valor": 14}]]]);
  });

  test("Deve finalizar a compra e mostrar o cupom.", async() => {
    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("4");
    askQuestion.mockResolvedValueOnce("4");
    await processarOpcao("4");
    expect(console.log.mock.calls).toEqual([["Concluir compra:"]]);
    expect(console.table.mock.calls).toEqual([[[{"categoria": "Bebida", "desconto": 0, "nome": "Cerveja", "preco": 7, "quantidade": 2, "valor": 14}]]]);
  });




  // test("Deve finalizar a compra e mostrar o cupom.", async() => {
  //   console.log = jest.fn();
  //   console.table = jest.fn();
  //   askQuestion.mockResolvedValueOnce("x");
  //   askQuestion.mockResolvedValueOnce("x");
  //   await processarOpcao("x");
  //   expect(console.log.mock.calls).toEqual();
  // });

  test("Uma tautologia.", () => {
    expect(1 === 1).toBe(true);
  });
});
