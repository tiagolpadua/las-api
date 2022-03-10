const PRODUTOS_MOCK = require("../mocks/produtos.json");
const CATEGORIAS_MOCK = require("../mocks/categorias.json");
const PRODUTOS_FORMATADO_MOCK = require("../mocks/produtos-formatado.json");
const { listarProdutosAPI, listarCategoriasAPI } = require("./api-service");
const {
  tratarOpcao,
  addProdutoCarrinho,
  finalizarCompra,
} = require("./carrinho");

jest.mock("./api-service");

describe("Desafio", () => {
  // Crie uma interface com testes em linha de comandos que:
  // 1 - Liste os produtos
  // 2 - Inclua um produto no carrinho
  // 3 - Visualize o carrinho
  // 4 - Finalize a compra e pergunte pelo cupom de desconto
  // x - Saia do sistema

  test("Deve listar os produtos.", async () => {
    listarProdutosAPI.mockResolvedValue(PRODUTOS_MOCK);
    const listaProdutos = await tratarOpcao("1");
    expect(listaProdutos).toEqual(PRODUTOS_FORMATADO_MOCK);
  });

  test("Deve incluir um produto no Carrinho.", async () => {
    listarProdutosAPI.mockResolvedValue(PRODUTOS_MOCK);
    listarCategoriasAPI.mockResolvedValue(CATEGORIAS_MOCK);

    const listaProdutos = await listarProdutosAPI();
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
