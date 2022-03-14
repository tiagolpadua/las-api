describe("Desafio", () => {
const PRODUTOS_MOCK = require("../mocks/produtos.json");
const CATEGORIAS_MOCK = require("../mocks/categorias.json");
const { listarProdutos, listarCategorias } = require("./api-service");
const {
  processarOpcao,
  addProdutoCarrinho,
  finalizarCompra,
  mostrarOpcoes
} = require("./carrinho");

jest.mock("./api-service");

describe("Desafio", () => {
  // Crie uma interface com testes em linha de comandos que:

  test("Deve mostrar o menu de opcoes", () => {
    console.log = jest.fn();
    mostrarOpcoes();
    expect(console.log.mock.calls).toEqual([
    [`
    Escolha uma opção:
    1 - Listar Produtos
    2 - Incluir Produto no Carinho
    3 - Visualizar Carrinho
    4 - Finalizar Compra
    x - Sair
  `]
    ]);
  });

  // 1 - Liste os produtos
  test("Deve listar os produtos.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    console.table = jest.fn();

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

  // 2 - Inclua um produto no carrinho
  test("Deve incluir um produto no Carrinho.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    listarCategorias.mockResolvedValue(CATEGORIAS_MOCK);

    const listaProdutos = await listarProdutos();
    const produto01 = {
      id: 2,
      nome: "Cerveja",
      categoria: "Bebida",
      desconto: 0,
      preco: 7,
      quantidade: 2,
      valor: 14,
    };
    const produto02 = {
      id: 4,
      nome: "Fruta",
      categoria: "Alimentação",
      desconto: 15,
      preco: 12,
      quantidade: 3,
      valor: 36,
    };
    const produtoAddCarrinho01 = await addProdutoCarrinho(
      listaProdutos,
      "2",
      "2"
    );
    const produtoAddCarrinho02 = await addProdutoCarrinho(
      listaProdutos,
      "4",
      "3"
    );

    expect(await produtoAddCarrinho01).toEqual(produto01);
    expect(await produtoAddCarrinho02).toEqual(produto02);
    expect(await addProdutoCarrinho(listaProdutos, "6", 2)).toBeUndefined();
    expect(await addProdutoCarrinho(listaProdutos, "2", -1)).toBeUndefined();
  });

  // 3 - Visualize o carrinho
  test("Deve retornar o carrinho de compras", async () => {
    const carrinhoDeCompras = await processarOpcao("3");

    expect(carrinhoDeCompras).toBeInstanceOf(Array);
  });

  // 4 - Finalize a compra e pergunte pelo cupom de desconto
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
      "Desconto do cupom é: 0\n" +
      "Total: 104.4\n" +
      "Compra finalizada com sucesso\n";
    const compraFinalizada = finalizarCompra(carrinhoDeCompras, 0);

    expect(compraFinalizada).toEqual(comprovanteCompraFinalizada);
  });

  test("Deve solicitar uma opção válida.", async () => {
    expect(await processarOpcao("9")).toEqual("Informe uma opção válida!");
    expect(await processarOpcao()).toEqual("Informe uma opção válida!");
  });

  // x - Saia do sistema
  // test("Deve sair do sistema", async () => {});
});
});
