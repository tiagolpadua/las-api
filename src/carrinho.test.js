const {
  imprimirOpcoes,
  processarOpcao,
  escolherProduto,
} = require("./carrinho");
const { GET } = require("./api-service");

const { askQuestion } = require("./ask-question");
jest.mock("./ask-question");
jest.mock("./api-service");

const PRODUTOS_MOCK = require("../mocks/produtos.json");

describe("Desafio", () => {
  it("Deve imprimir corretamente as opções do menu.", () => {
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

  it("Deve listar os produtos, quando a opção escolhida for 1", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    GET.mockResolvedValue(PRODUTOS_MOCK);
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

  it("Deve incluir os produtos quando digitar 2.", async () => {
    GET.mockResolvedValue(PRODUTOS_MOCK);
    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("2");
    await processarOpcao("2");
    expect(console.table.mock.calls).toEqual([
      [[{ categoria: "Bebida", nome: "Cerveja", preco: 7, qtd: 2, valor: 14 }]],
    ]);
  });

  it("Deve sair da cli quando a opção digitada for x", async () => {
    expect(processarOpcao("x")).toReturn(process.exit);
  });
});
