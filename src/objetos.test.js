const {
  obterMenorPreco,
  obterMaiorPreco,
  incluirPrecoFormatado,
  obterDescontoCategoria,
  obterProdutosLimitadosAoOrcamento,
  calcularTotalDaCompra,
  obterMenorEMaiorPrecos,
  obterProdutosDentroDoOrcamento,
  obterDescontoTotal,
  calcularTotalDaCompraComDescontos,
  CarrinhoDeCompras,
} = require("./objetos");

const serpentina = {
  nome: "Serpentina",
  categoria: "Infantil",
  quantidade: 1,
  preco: 30,
};

const confete = {
  nome: "Confete",
  categoria: "Infantil",
  quantidade: 4,
  preco: 10,
};

const refrigerante = {
  nome: "Refrigerante",
  categoria: "Bebida",
  quantidade: 3,
  preco: 7,
};

const cerveja = {
  nome: "Cerveja",
  categoria: "Bebida",
  quantidade: 3,
  preco: 8,
};

const sanduiche = {
  nome: "Sanduíche",
  categoria: "Alimentação",
  quantidade: 5,
  preco: 12,
};

const produtos0 = [serpentina, confete, refrigerante, cerveja, sanduiche];

const espuma = {
  nome: "Espuma",
  categoria: "Infantil",
  quantidade: 2,
  preco: 10,
};

const batida = {
  nome: "Batida",
  categoria: "Bebida",
  quantidade: 1,
  preco: 5,
};

const suco = {
  nome: "Suco",
  categoria: "Bebida",
  quantidade: 1,
  preco: 6,
};

const laranja = {
  nome: "Laranja",
  categoria: "Alimentação",
  quantidade: 4,
  preco: 9,
};

const produtos1 = [confete, espuma, batida, suco, laranja];

describe("Essencial", () => {
  test("Deve obter o menor preço.", () => {
    expect(obterMenorPreco([])).toBeUndefined();

    expect(obterMenorPreco("foo")).toBeUndefined();

    expect(obterMenorPreco(produtos0)).toEqual(refrigerante);

    expect(obterMenorPreco(produtos1)).toEqual(batida);
  });

  test("Deve obter o maior preço.", () => {
    expect(obterMaiorPreco([])).toBeUndefined();

    expect(obterMaiorPreco("foo")).toBeUndefined();

    expect(obterMaiorPreco(produtos0)).toEqual(serpentina);

    expect(obterMaiorPreco(produtos1)).toEqual(confete);
  });

  test("Deve incluir os preços formatados.", () => {
    expect(incluirPrecoFormatado(produtos0[0])).toEqual({
      ...produtos0[0],
      precoFormatado: "R$ 30,00",
    });
    expect(incluirPrecoFormatado(produtos1[2])).toEqual({
      ...produtos1[2],
      precoFormatado: "R$ 5,00",
    });
  });

  test("Deve retornar o desconto da categoria.", () => {
    expect(obterDescontoCategoria("Alimentação")).toEqual(30);

    expect(obterDescontoCategoria("Infantil")).toEqual(15);

    expect(obterDescontoCategoria("Foo")).toEqual(0);
  });

  test("Deve retornar os produtos limitados ao orçamento.", () => {
    expect(obterProdutosLimitadosAoOrcamento([], 1)).toBeUndefined();

    expect(obterProdutosLimitadosAoOrcamento("foo", 1)).toBeUndefined();

    expect(obterProdutosLimitadosAoOrcamento(produtos0, 9)).toEqual([
      refrigerante,
      cerveja,
    ]);

    expect(obterProdutosLimitadosAoOrcamento(produtos1, 7)).toEqual([
      batida,
      suco,
    ]);
  });

  test("Deve calcular o valor total da compra.", () => {
    expect(calcularTotalDaCompra([])).toBeUndefined();

    expect(calcularTotalDaCompra("foo")).toBeUndefined();

    expect(calcularTotalDaCompra([serpentina, refrigerante, cerveja])).toEqual(
      75
    );

    expect(calcularTotalDaCompra([confete, batida, suco])).toEqual(51);
  });
});

const cupomNulabssa = { texto: "NULABSSA", desconto: 10 };

const cupomAluranu = { texto: "ALURANU", desconto: 15 };
describe("Desejável", () => {
  test("Deve retornar os produtos com menor e o maior preços.", () => {
    expect(obterMenorEMaiorPrecos([])).toBeUndefined();

    expect(obterMenorEMaiorPrecos("foo")).toBeUndefined();

    expect(obterMenorEMaiorPrecos(produtos0)).toEqual({
      maiorPreco: serpentina,
      menorPreco: refrigerante,
    });

    expect(obterMenorEMaiorPrecos(produtos1)).toEqual({
      maiorPreco: confete,
      menorPreco: batida,
    });
  });

  test("Deve retornar os produtos dentro do orçamento.", () => {
    expect(obterProdutosDentroDoOrcamento([], 1, 1)).toBeUndefined();

    expect(obterProdutosDentroDoOrcamento("foo", 1, 1)).toBeUndefined();

    expect(
      obterProdutosDentroDoOrcamento([10, 7, 8, 25, 8, 9, 100, 99], 50, 30)
    ).toBeUndefined();

    expect(obterProdutosDentroDoOrcamento(produtos0, 9, 30)).toEqual([
      serpentina,
      confete,
      sanduiche,
    ]);

    expect(obterProdutosDentroDoOrcamento(produtos1, 1, 10)).toEqual([
      confete,
      espuma,
      batida,
      suco,
      laranja,
    ]);
  });

  test("Deve retornar o desconto total.", () => {
    expect(obterDescontoTotal("Alimentação", cupomNulabssa)).toEqual(40);

    expect(obterDescontoTotal("Alimentação", cupomAluranu)).toEqual(45);

    expect(obterDescontoTotal("Infantil", cupomAluranu)).toEqual(30);

    expect(obterDescontoTotal("Bebida", cupomAluranu)).toEqual(15);

    expect(
      obterDescontoTotal("Alimentação", { texto: "ALURANU", desconto: -99 })
    ).toEqual(30);

    expect(
      obterDescontoTotal("Bebida", { texto: "CUPOM-INVALIDO", desconto: 15 })
    ).toEqual(0);

    expect(
      obterDescontoTotal("Alimentação", {
        texto: "CUPOM-INVALIDO",
        desconto: 15,
      })
    ).toEqual(30);

    expect(
      obterDescontoTotal("KKK", { texto: "CUPOM-INVALIDO", desconto: 15 })
    ).toEqual(0);
  });

  test("Deve calcular o total da compra com descontos.", () => {
    expect(calcularTotalDaCompraComDescontos([], 1, "foo")).toBeUndefined();

    expect(calcularTotalDaCompraComDescontos("foo", [], "foo")).toBeUndefined();

    expect(
      calcularTotalDaCompraComDescontos(
        [serpentina, refrigerante, cerveja],
        cupomAluranu
      )
    ).toEqual(63.75);

    expect(
      calcularTotalDaCompraComDescontos(
        [confete, espuma, laranja],
        cupomAluranu
      )
    ).toEqual(85.95);
  });
});

describe("Desafio", () => {
  test("Deve criar o carrinho de compras.", () => {
    const carrinhoDeCompras = new CarrinhoDeCompras();
    expect(carrinhoDeCompras).toBeDefined();
    expect(carrinhoDeCompras.listarProdutos().length).toBe(0);
    expect(carrinhoDeCompras.obterCupom()).toBeFalsy();
  });

  test("Deve incluir produto no carrinho.", () => {
    const carrinhoDeCompras = new CarrinhoDeCompras();
    carrinhoDeCompras.incluirProduto(serpentina);
    carrinhoDeCompras.incluirProduto(batida);

    expect(carrinhoDeCompras.listarProdutos().length).toBe(2);
  });

  test("Deve excluir produto no carrinho.", () => {
    const carrinhoDeCompras = new CarrinhoDeCompras();
    carrinhoDeCompras.incluirProduto(serpentina);
    carrinhoDeCompras.incluirProduto(batida);
    carrinhoDeCompras.excluirProduto(1);
    expect(carrinhoDeCompras.listarProdutos().length).toBe(1);
  });

  test("Deve listar os produtos do carrinho.", () => {
    const carrinhoDeCompras = new CarrinhoDeCompras();
    carrinhoDeCompras.incluirProduto(serpentina);
    carrinhoDeCompras.incluirProduto(batida);
    expect(carrinhoDeCompras.listarProdutos().length).toBe(2);
  });

  test("Deve manter um cupom de desconto.", () => {
    const carrinhoDeCompras = new CarrinhoDeCompras();
    carrinhoDeCompras.definirCupom(cupomAluranu);
    expect(carrinhoDeCompras.obterCupom()).toEqual(cupomAluranu);
    carrinhoDeCompras.excluirCupom();
    expect(carrinhoDeCompras.obterCupom()).toBeFalsy();
  });

  test("Deve calcular o subtotal do carrinho.", () => {
    const carrinhoDeCompras = new CarrinhoDeCompras();
    carrinhoDeCompras.incluirProduto(serpentina);
    carrinhoDeCompras.incluirProduto(batida);
    carrinhoDeCompras.definirCupom(cupomAluranu);
    expect(carrinhoDeCompras.subtotal()).toBe(35);
  });

  test("Deve calcular o subtotal do carrinho.", () => {
    const carrinhoDeCompras = new CarrinhoDeCompras();
    carrinhoDeCompras.incluirProduto(serpentina);
    carrinhoDeCompras.incluirProduto(batida);
    carrinhoDeCompras.definirCupom(cupomAluranu);
    expect(carrinhoDeCompras.total()).toBe(25.25);
  });
});
