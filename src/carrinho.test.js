//const { askQuestion } = require("./ask-question");
jest.mock("./ask-question");

const { listarProdutos } = require("./api-service");
jest.mock("./api-service");

const PRODUTOS_MOCK = require("../mocks/produtos.json");

const { mostrarMenu, tratarOpcao} = require("./carrinho");



describe("Desafio", () => {
  // Crie uma interface com testes em linha de comandos que:
  // 1 - Liste os produtos
  // 2 - Inclua um produto no carrinho
  // 3 - Visualize o carrinho
  // 4 - Finalize a compra e pergunte pelo cupom de desconto
  // x - Saia do sistema
  test("Deve mostrar o menu", () => {
    console.log = jest.fn();
    mostrarMenu();
    expect(console.log.mock.calls).toEqual([
        ["Escolha uma opção:"],
        ["1 - Listar produtos"],
        ["2 - Incluir produto no carrinho"],
        ["3 - Visualizar carrinho"],
        ["4 - Finalizar compra"],
        ["x - Sair"]
      ]);
  });



  test("Deve listar os produtos ao digitar 1", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    await tratarOpcao("1");

    expect(console.log.mock.calls).toEqual([["Lista de Produtos: "]]);
    expect(console.table.mock.calls).toEqual([[[
      { "categoria": "Infantil", "nome": "Confete", "preco": 30, "desconto" : 15 },
      { "categoria": "Infantil", "nome": "Serpentina", "preco": 10, "desconto" : 15 },
      { "categoria": "Bebida", "nome": "Cerveja", "preco": 7, "desconto" : 0 },
      { "categoria": "Bebida", "nome": "Refrigerante", "preco": 8, "desconto" : 0 },
      { "categoria": "Alimentação", "nome": "Fruta", "preco": 12, "desconto" : 30 }
    ]]]);
  });

  test("Deve mostrar o carrinho ao digitar 3", async () => {
    console.table = jest.fn();
    const carrinho = [{"id" : 3, "nome": "Refrigerante", "categoria": "Bebida", "preco": 8, "qtd": 1, "valor": 8 }];
    await tratarOpcao("3", carrinho);

    expect(console.table.mock.calls).toEqual([[carrinho]]);
  });


});
