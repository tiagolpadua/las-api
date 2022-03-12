const { exibirMenu } = require("./carrinho");
const { processarOpcao } = require("./carrinho");
const { GET } = require("./api-service");

const PRODUTOS_MOCK = require("../mocks/produtos.json");
jest.mock("./api-service");

describe("Desafio", () => {
  it("Deve imprimir corretamente as opções do menu.", () => {
    console.log = jest.fn();
    exibirMenu();
    expect(console.log.mock.calls).toEqual([
      ["Escolha uma opção:"],
      ["1 - Listar Produtos"],
      ["2 - Incluir Produto no Carinho"],
      ["3 - Visualizar Carrinho"],
      ["4 - Finalizar Compra"],
      ["5 - Sair"],
    ]);
  });

  it("Deve listar os produtos, quando a opção escolhida for 1.", async () => {
    console.table = jest.fn();
    GET.mockResolvedValue(PRODUTOS_MOCK);
    await processarOpcao("1");
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
});

processarOpcao("1");
