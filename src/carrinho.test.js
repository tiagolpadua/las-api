const { listarProdutos } = require("./api-service");
const { exibeMenu, processaEscolha } = require("./carrinho");
const { askQuestion } = require("./ask");
const PRODUTOS_MOCK = require("../mocks/produtos.json");
jest.mock("./api-service");
jest.mock("./ask");

describe("Desafio", () => {

  test("Deve exibir o menu de opções.", () => {
    console.log = jest.fn();
    exibeMenu();
    expect(console.log.mock.calls).toEqual([["*************************************************************"], ["      Menu de Opções"], ["  1 - Liste os produtos."], ["  2 - Inclua um produto no carrinho."], ["  3 - Visualize o carrinho."], ["  4 - Insira cupom e finaliza compra."], ["  x - para sair."], ["*************************************************************"]]);
  });

  test("Deve listar os produtos ao digitar 1.", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    await processaEscolha("1");
    expect(console.log.mock.calls).toEqual([["Lista de Produtos: "]]);
    expect(console.table.mock.calls).toEqual([[[{ "categoria": "Infantil", "nome": "Confete", "preco": 30 }, { "categoria": "Infantil", "nome": "Serpentina", "preco": 10 }, { "categoria": "Bebida", "nome": "Cerveja", "preco": 7 }, { "categoria": "Bebida", "nome": "Refrigerante", "preco": 8 }, { "categoria": "Alimentação", "nome": "Fruta", "preco": 12 }]]]);
  });

  test("Deve incluir os produtos ao digitar 2.", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("2");
    await processaEscolha("2");
    expect(console.table.mock.calls).toEqual([[[{ "categoria": "Bebida", "nome": "Cerveja", "preco": "R$ 7,00", "qtd": 2, "valor": 14 }]]]);
  });

  test("Deve exibir o carro ao digitar 3.", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    await processaEscolha("3");
    expect(console.table.mock.calls).toEqual([[[{ "categoria": "Bebida", "nome": "Cerveja", "preco": "R$ 7,00", "qtd": 2, "valor": 14 }]]]);
  });


  test("Deve finalizar compra ao digitar 4.", async () => {//mais askquestions
    const saida = [[[{"categoria": "Bebida", "nome": "Cerveja", "preco": "R$ 7,00", "qtd": 2, "valor": 14}]]];
    console.log = jest.fn();
    console.table = jest.fn();
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    await processaEscolha("4");
    askQuestion.mockResolvedValueOnce("aluranu");
    askQuestion.mockResolvedValueOnce("10");
    expect(console.table.mock.calls).toEqual(saida);
  });

  test("Deve sair do sistema ao digita x", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("x");
    await processaEscolha("x");
    expect(console.log.mock.calls).toEqual([["Sistema de compras NuLab/LAS finalizado!"]]);
  });

  test("Deve emitir erro se informar uma opção inválida.", async () => {
    askQuestion.mockResolvedValueOnce("errada");
    await expect(processaEscolha("errada")).rejects.toThrow("Opção inválida.");
  });
});