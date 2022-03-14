const { imprimirOpcoes,processarOpcao }= require("./carrinho");
const { listarProdutos } = require("./api-service");
const { askQuestion } = require("./ask-question");

jest.mock("./api-service");
jest.mock("./ask-question");

const PRODUTOS_MOCK = require("../mocks/produtos.json");

describe("Desafio", () => {
  // Crie uma interface com testes em linha de comandos que:
  // 1 - Liste os produtos
  // 2 - Inclua um produto no carrinho
  // 3 - Visualize o carrinho
  // 4 - Finalize a compra e pergunte pelo cupom de desconto
  // x - Saia do sistema

  test("Deve imprimir as opções.",() => {
    console.log = jest.fn();
    imprimirOpcoes();
    expect(console.log.mock.calls).toEqual( [["1 - Listar Produtos"], ["2 - Inclua um produto no carrinho"], ["3 - Visualize o carrinho"], ["4 - Finalize a compra e pergunte pelo cupom de desconto"], ["x - Saia do sistema"]]);
  });

  test("Deve listar os produtos quando digitar 1", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    await processarOpcao("1");
    expect(console.log.mock.calls).toEqual([["Lista de Produtos"]]);
    expect(console.table.mock.calls).toEqual([[[{"categoria": "Infantil", "nome": "Confete", "preco": 30}, {"categoria": "Infantil", "nome": "Serpentina", "preco": 10}, {"categoria": "Bebida", "nome": "Cerveja", "preco": 7}, {"categoria": "Bebida", "nome": "Refrigerante", "preco": 8}, {"categoria": "Alimentação", "nome": "Fruta", "preco": 12}]]]);
  });

  test("Deve incluir os produtos quando digitar 2", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("2");
    
    await processarOpcao("1");
    expect(console.table.mock.calls).toEqual([[[{"categoria": "Infantil", "nome": "Confete", "preco": 30}, {"categoria": "Infantil", "nome": "Serpentina", "preco": 10}, {"categoria": "Bebida", "nome": "Cerveja", "preco": 7}, {"categoria": "Bebida", "nome": "Refrigerante", "preco": 8}, {"categoria": "Alimentação", "nome": "Fruta", "preco": 12}]]]);
    
  });
});
