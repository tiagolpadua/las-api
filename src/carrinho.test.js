const { imprimirOpcoes, processarOpcao } = require("./carrinho");

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

  test("Deve imprimir as opções.", () => {
    console.log = jest.fn();
    imprimirOpcoes();
    expect(console.log.mock.calls).toEqual([
      ["Escolha uma opção:"],
      ["1 - Listar produtos"],
      ["2 - Incluir produto no carrinho"],
      ["3 - Visualizar carrinho"],
      ["4 - Finalizar compra"],
      ["x - Sair"],
    ]);
  });

  test("Deve listar os produtos quando digitar 1.", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    await processarOpcao("1");
    expect(console.log.mock.calls).toEqual([["Lista de Produtos"]]);
    expect(console.table.mock.calls).toEqual([
      [
        [
          { categoria: "Infantil", nome: "Confete", preco: 30 },
          { categoria: "Infantil", nome: "Serpentina", preco: 10 },
          { categoria: "Bebida", nome: "Cerveja", preco: 7 },
          { categoria: "Bebida", nome: "Refrigerante", preco: 8 },
          { categoria: "Alimentação", nome: "Fruta", preco: 12 },
        ],
      ],
    ]);
  });

  test("Deve incluir os produtos quando digitar 2.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("2");
    await processarOpcao("2");
    expect(console.table.mock.calls).toEqual([
      [[{ categoria: "Bebida", nome: "Cerveja", preco: 7, qtd: 2, valor: 14 }]],
    ]);
  });

  test("Deve mostrar o carinho.", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("3");
    await processarOpcao("3");
    expect(console.table.mock.calls).toEqual([
      [[{ categoria: "Bebida", nome: "Cerveja", preco: 7, qtd: 2, valor: 14 }]],
    ]);
  });

  test("Deve verificar o status da compra e o cupom de desconto.", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("NULABSSA");
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("3");
    await processarOpcao("4");
    expect(console.table.mock.calls).toEqual([
      [
        [
          {
            categoria: "Bebida",
            desconto: 0,
            nome: "Cerveja",
            preco: "R$ 6,30",
            qtd: 2,
            valor: 14,
          },
        ],
      ],
    ]);
  });

  test("Deve sair do sistema.", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("2");

    await processarOpcao("x");
    expect(console.log.mock.calls).toEqual([]);
  });
});
