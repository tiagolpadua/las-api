const { listarProdutos } = require("./api-service");

const  {menu, opacaoEscolhida } = require("./carrinho");

jest.mock("./api-service");
const PRODUTOS_MOCK = require("../mocks/produtos.json");

const { askQuestion } = require("./ask-question");
jest.mock("./ask-question");

describe("Desafio", () => {
  // Crie uma interface com testes em linha de comandos que:
  // 1 - Liste os produtos
  // 2 - Inclua um produto no carrinho
  // 3 - Visualize o carrinho
  // 4 - Finalize a compra e pergunte pelo cupom de desconto
  // x - Saia do sistema
  test("Deve exvibir o menu", () => {
    console.log = jest.fn();
    menu();
    expect(console.log.mock.calls).toEqual([["1 - Listar Produtos"], ["2 - Incluir produtos no carrinho"], ["3 - Visualizar carrinho"], ["4 - finalizar compra"], ["x - sair"]]);
  });

  test("Deve retorna uma lista de produtos", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.log = jest.fn();
    console.table = jest.fn();
    await opacaoEscolhida("1");

    expect(console.log.mock.calls).toEqual([["Lista de Produtos: "]]);

    expect(console.table.mock.calls).toEqual([[[{"categoria": "Infantil", "nome": "Confete", "preco": 30}, {"categoria": "Infantil", "nome": "Serpentina", "preco": 10}, {"categoria": "Bebida", "nome": "Cerveja", "preco": 7}, {"categoria": "Bebida", "nome": "Refrigerante", "preco": 8}, {"categoria": "Alimentação", "nome": "Fruta", "preco": 12}]]]);
  });

  test("deve incluir um produto no carrinho.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);

    console.table = jest.fn();
    askQuestion.mockResolvedValue("2");
    askQuestion.mockResolvedValue("2");

    await opacaoEscolhida("2");
    expect(console.table.mock.calls).toEqual([[{"produtos": [{"categoria": "Bebida", "nome": "Cerveja", "preco": 7, "quantidade": 2}]}]]);
  });

  test("Deve retornar um erro caso produto escolhido não esteja na lista", async () =>{
    console.log = jest.fn();
    askQuestion.mockResolvedValue("6");

    await opacaoEscolhida("2");
    expect(console.log.mock.calls).toEqual([["produto informado inválido"]]);
  });
  test("deve mostrar o carrinho de compras", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.table = jest.fn();
    await opacaoEscolhida("3");

    expect(console.table.mock.calls).toEqual([[[{"categoria": "Bebida", "nome": "Cerveja", "preco": 7, "quantidade": 2}]]]);
  });
  
  test("Se não for informado quantidade deve retornar uma mensagem", async () =>{
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);

    console.error = jest.fn();
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("");

    await opacaoEscolhida("2");
    expect(console.error.mock.calls).toEqual([["Quantidade inválida: NaN"]]);
  });
  
  test("Deve retornar um erro caso produto escolhido não esteja na lista", async () =>{
    console.log = jest.fn();
    askQuestion.mockResolvedValue("NULABSSA");

    await opacaoEscolhida("4");
    expect(console.log.mock.calls).toEqual([["O total da sua compra foi R$ 14,00"]]);
  });

  test("Se não for informado o cupom deve retornar um o valor total", async () =>{
    console.log = jest.fn();
    askQuestion.mockResolvedValue("");

    await opacaoEscolhida("4");
    expect(console.log.mock.calls).toEqual([["O total da sua compra foi R$ 14,00"]]);
  });

  test("deve sair do sisteam", async () =>{
    askQuestion.mockResolvedValue("x");
    expect().toBe();
  });
});
