const { imprimirOpcoes, processarOpcao, aplicaDesconto } = require("./carrinho");

const { askQuestion } = require("./ask-question");
jest.mock("./ask-question");

const { listarProdutos, listarCategorias } = require("./api-service");
jest.mock("./api-service");

const PRODUTOS_MOCK = require("../mocks/produtos.json");
const CATEGORIAS_MOCK = require("../mocks/categorias.json");

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
    expect(console.log.mock.calls).toEqual([["Escolha uma opção:"], ["1 - Listar produtos"], ["2 - Incluir produto no carrinho"], ["3 - Visualizar carrinho"], ["4 - Finalizar compra"], ["x - Sair"]]);
  });

  test("Deve listar os produtos quando digitar 1.", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    await processarOpcao("1");
    expect(console.log.mock.calls).toEqual([["Lista de Produtos"]]);
    expect(console.table.mock.calls).toEqual([[[{ "categoria": "Infantil", "nome": "Confete", "preco": 30 }, { "categoria": "Infantil", "nome": "Serpentina", "preco": 10 }, { "categoria": "Bebida", "nome": "Cerveja", "preco": 7 }, { "categoria": "Bebida", "nome": "Refrigerante", "preco": 8 }, { "categoria": "Alimentação", "nome": "Fruta", "preco": 12 }]]]);
  });

  test("Deve incluir os produtos quando digitar 2.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    listarCategorias.mockResolvedValue(CATEGORIAS_MOCK);
    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("2");
    await processarOpcao("2");
    expect(console.table.mock.calls).toEqual([[[{"categoria": "Bebida", "desconto": 0, "nome": "Cerveja", "preco": 7, "qtd": 2, "valor": 14}]]]);
  });

  test("Deve informar quando o produto for inválido.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.error = jest.fn();
    askQuestion.mockResolvedValueOnce("xxx");
    await processarOpcao("2");
    expect(console.error.mock.calls).toEqual([["Produto não localizado: NaN"]]);
  });

  test("Deve informar quando a quantidade for inválida.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.error = jest.fn();
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("xxx");
    await processarOpcao("2");
    expect(console.error.mock.calls).toEqual([["Quantidade inválida: NaN"]]);
  });

  test("Deve exibir os produtos do carrinho quando digitar 3.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.table = jest.fn();
    await processarOpcao("3");
    expect(console.table.mock.calls).toEqual([[[{"categoria": "Bebida", "desconto": 0, "nome": "Cerveja", "preco": 7, "qtd": 2, "valor": 14}]]]);
  });

  test("Deve informar o total da compra ao digitar 4.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.log = jest.fn();
    askQuestion.mockResolvedValueOnce("nao");
    await processarOpcao("4");
    expect(console.log.mock.calls).toEqual([["O subtotal da sua compra é 14"], ["O total da sua compra 14"], ["Compra finalizada"]]);
  });

  test("Deve aplicar o cupom de desconto na compra.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.log = jest.fn();
    askQuestion.mockResolvedValueOnce("SIM");
    askQuestion.mockResolvedValueOnce("NULABSSA");
    askQuestion.mockResolvedValueOnce("20");
    await processarOpcao("4");
    expect(console.log.mock.calls).toEqual([["O subtotal da sua compra é 14"], ["O total da sua compra 11.2"], ["Compra finalizada"]]);
  });

  test("Deve informar se o cupom é válido.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.log = jest.fn();
    askQuestion.mockResolvedValueOnce("SIM");
    askQuestion.mockResolvedValueOnce("cupom-inválido");
    await processarOpcao("4");
    expect(console.log.mock.calls).toEqual([["O subtotal da sua compra é 14"], ["Cupom inválido"], ["O total da sua compra 14"], ["Compra finalizada"]]);
  });
  
  test("Deve informar se a quantidade é válida.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.log = jest.fn();
    askQuestion.mockResolvedValueOnce("SIM");
    askQuestion.mockResolvedValueOnce("NULABSSA");
    askQuestion.mockResolvedValueOnce("xxx");
    await processarOpcao("4");
    expect(console.log.mock.calls).toEqual([["O subtotal da sua compra é 14"], ["Quantidade inválida."], ["O total da sua compra 14"], ["Compra finalizada"]]);
  }); 

   test("Deve aplicar o desconto.", () => {
    const carrinhoDeCompras = [
      {
        id: 4,
        nome: "Sanduíche",
        categoria: "Alimentação",
        preco: 12,
        desconto: 30,
        quantidade: 2,
        valor: 24,
      },
      {
        id: 0,
        nome: "Serpentina",
        categoria: "Infantil",
        preco: 30,
        desconto: 15,
        quantidade: 2,
        valor: 60,
      },
      {
        id: 1,
        nome: "Confete",
        categoria: "Infantil",
        preco: 10,
        desconto: 15,
        quantidade: 3,
        valor: 30,
      },
    ];
    expect(aplicaDesconto(carrinhoDeCompras)).toBe(93.3);
  });

  test("Deve informar se a opção digitada é inválida.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.log = jest.fn();
    await processarOpcao("xxx");
    expect(console.log.mock.calls).toEqual([["Opção inválida!"]]);
  });
});
