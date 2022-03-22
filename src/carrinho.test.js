const PRODUTOS_MOCK = require("../mocks/produtos.json");
const CATEGORIAS_MOCK = require("../mocks/categorias.json");
const { listarProdutosAPI, listarCategoriasAPI } = require("./api-service");
const { tratarOpcao, finalizarCompra, mostrarMenu } = require("./carrinho");
const askQuestion = require("./ask-question");

jest.mock("./api-service");
jest.mock("./ask-question");

describe("Desafio", () => {
  // Crie uma interface com testes em linha de comandos que:
  // 1 - Liste os produtos
  // 2 - Inclua um produto no carrinho
  // 3 - Visualize o carrinho
  // 4 - Finalize a compra e pergunte pelo cupom de desconto
  // x - Saia do sistema

  test("Deve listar o menu", () => {
    console.log = jest.fn();
    mostrarMenu();
    expect(console.log.mock.calls).toEqual([
      ["Escolha uma opção:"],
      ["1 - Listar Produtos"],
      ["2 - Incluir Produto no Carinho"],
      ["3 - Visualizar Carrinho"],
      ["4 - Finalizar Compra"],
      ["x - Sair"],
    ]);
  });

  test("Deve listar os produtos.", async () => {
    listarProdutosAPI.mockResolvedValue(PRODUTOS_MOCK);
    console.table = jest.fn();

    await tratarOpcao("1");
    expect(console.table.mock.calls).toEqual([
      [
        [
          { categoria: "Infantil", nome: "Confete", preco: "R$ 30,00" },
          { categoria: "Infantil", nome: "Serpentina", preco: "R$ 10,00" },
          { categoria: "Bebida", nome: "Cerveja", preco: "R$ 7,00" },
          { categoria: "Bebida", nome: "Refrigerante", preco: "R$ 8,00" },
          { categoria: "Alimentação", nome: "Fruta", preco: "R$ 12,00" },
        ],
      ],
    ]);
  });

  test("Deve incluir um produto no Carrinho.", async () => {
    listarProdutosAPI.mockResolvedValue(PRODUTOS_MOCK);
    listarCategoriasAPI.mockResolvedValue(CATEGORIAS_MOCK);

    console.table = jest.fn();

    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("2");
    await tratarOpcao("2");
    expect(console.table.mock.calls).toEqual([
      [
        {
          categoria: "Bebida",
          desconto: 0,
          id: 2,
          nome: "Cerveja",
          preco: 7,
          quantidade: 2,
          valor: 14,
        },
      ],
    ]);
  });

  test("Deve retornar o carrinho de compras", async () => {
    const carrinhoDeCompras = await tratarOpcao("3");

    expect(carrinhoDeCompras).toBeInstanceOf(Array);
  });

  test("Deve retornar uma compra finalizada", async () => {
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
    const comprovanteCompraFinalizada =
      "Subtotal: R$ 104.4\n" +
      "Desconto do cupom é: 0%\n" +
      "Total: 104.4\n" +
      "Compra finalizada com sucesso\n";
    const compraFinalizada = finalizarCompra(carrinhoDeCompras, 0);

    expect(compraFinalizada).toEqual(comprovanteCompraFinalizada);
  });

  test("Deve solicitar uma opção válida.", async () => {
    expect(await tratarOpcao("9")).toEqual("Informe uma opção válida!");
    expect(await tratarOpcao()).toEqual("Informe uma opção válida!");
  });

  test("Deve executar a função apenas uma vez", async () => {});
});
