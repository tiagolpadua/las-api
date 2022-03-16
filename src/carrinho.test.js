const { mostraOpcoes, processarOpcao } = require("./carrinho");
const { listarProdutos } = require("./api-service");
const { askQuestion } = require ("./ask-question");

jest.mock("./ask-question");

const PRODUTOS_MOCK = require("../mocks/produtos.json");

jest.mock("./api-service");


describe("Desafio", () => {
  // Crie uma interface com testes em linha de comandos que:
  // 1 - Liste os produtos
  // 2 - Inclua um produto no carrinho
  // 3 - Visualize o carrinho
  // 4 - Finalize a compra e pergunte pelo cupom de desconto
  // x - Saia do sistema

  test("Deve imprimir as opções", () => {
    console.log = jest.fn();
    mostraOpcoes();
    expect(console.log.mock.calls).toEqual([["Escolha uma opção:"], ["1 - Listar Produtos"], ["2 - Incluir Produto no Carrinho"], ["3 - Visualizar Carrinho"], ["4 - Finalizar Compra"], ["X - Sair"]]);
  });

  test("Deve listar os produtos quando for digitado 1", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    await processarOpcao("1");
    expect(console.table.mock.calls).toEqual([[[{"categoria": "Infantil", "nome": "Confete", "preco": 30}, {"categoria": "Infantil", "nome": "Serpentina", "preco": 10}, {"categoria": "Bebida", "nome": "Cerveja", "preco": 7}, {"categoria": "Bebida", "nome": "Refrigerante", "preco": 8}, {"categoria": "Alimentação", "nome": "Fruta", "preco": 12}]]]);
  });

  test("Deve incluir os produtos quando for digitado 2", async () =>{
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.log = jest.fn();
    console.table = jest.fn();

    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("2");
    await processarOpcao("2");
    expect(console.table.mock.calls).toEqual([[[{"categoria": "Bebida", "nome": "Cerveja", "preco": 7, "quantidade": 2, "valor": 14}]]]);

  });
});
