const {
  obterMenorPreco,
  obterMaiorPreco,
  capitalizarNomes,
  obterDescontoCategoria,
  obterPrecosLimitadosAoOrcamento,
  calcularTotalDaCompra,
  obterMenorEMaiorPrecos,
  obterPrecosDentroDoOrcamento,
  obterDescontoTotal,
  calcularTotalDaCompraComDescontos,
  capitalizarNomeCompleto,
  gerarCupomFiscal,
} = require("./arrays");

describe("Essencial", () => {
  test("Deve obter o menor preço.", () => {
    expect(obterMenorPreco([])).toBeUndefined();

    expect(obterMenorPreco("foo")).toBeUndefined();

    expect(obterMenorPreco([10, 7, 8, 25, 8, 9, 100, 99])).toEqual(7);

    expect(obterMenorPreco([10, 7, 8, 25, 8, 9, -1, 99])).toEqual(-1);
  });

  test("Deve obter o maior preço.", () => {
    expect(obterMaiorPreco([])).toBeUndefined();

    expect(obterMaiorPreco("foo")).toBeUndefined();

    expect(obterMaiorPreco([10, 7, 8, 25, 8, 9, 100, 99])).toEqual(100);

    expect(obterMaiorPreco([10, 7, 8, 25, 8, 999, 100, 99])).toEqual(999);
  });

  test("Deve retornar uma lista de nomes capitalizados.", () => {
    expect(capitalizarNomes([])).toBeUndefined();

    expect(capitalizarNomes("foo")).toBeUndefined();

    expect(capitalizarNomes(["tiago", "Alexandre", "kamillA"])).toEqual([
      "Tiago",
      "Alexandre",
      "Kamilla",
    ]);

    expect(capitalizarNomes(["maria", "pedro"])).toEqual(["Maria", "Pedro"]);
  });

  test("Deve retornar o desconto da categoria.", () => {
    expect(obterDescontoCategoria("Alimentação")).toEqual(30);

    expect(obterDescontoCategoria("Infantil")).toEqual(15);

    expect(obterDescontoCategoria("Foo")).toEqual(0);
  });

  test("Deve retornar os preços limitados ao orçamento.", () => {
    expect(obterPrecosLimitadosAoOrcamento([], 1)).toBeUndefined();

    expect(obterPrecosLimitadosAoOrcamento("foo", 1)).toBeUndefined();

    expect(obterPrecosLimitadosAoOrcamento([5, 7, 9, 50, 20], 9)).toEqual([
      5, 7, 9,
    ]);

    expect(obterPrecosLimitadosAoOrcamento([5, 7, 9, 50, 20], 5)).toEqual([5]);
  });

  test("Deve calcular o valor total da compra.", () => {
    expect(calcularTotalDaCompra([])).toBeUndefined();

    expect(calcularTotalDaCompra("foo")).toBeUndefined();

    expect(calcularTotalDaCompra([10, 30, 5, 15])).toEqual(60);

    expect(calcularTotalDaCompra([10, 30, 5, 15, 3])).toEqual(63);
  });
});

describe("Desejável", () => {
  test("Deve retornar o menor e o maior preços.", () => {
    expect(obterMenorEMaiorPrecos([])).toBeUndefined();

    expect(obterMenorEMaiorPrecos("foo")).toBeUndefined();

    expect(obterMenorEMaiorPrecos([10, 7, 8, 25, 8, 9, 100, 99])).toEqual([
      7, 100,
    ]);

    expect(
      obterMenorEMaiorPrecos([10, 1, 7, 8, 25, 8, 9, 100, 99, 1000])
    ).toEqual([1, 1000]);
  });

  test("Deve retornar os preços dentro do orçamento.", () => {
    expect(obterPrecosDentroDoOrcamento([], 1, 1)).toBeUndefined();

    expect(obterPrecosDentroDoOrcamento("foo", 1, 1)).toBeUndefined();

    expect(
      obterPrecosDentroDoOrcamento([10, 7, 8, 25, 8, 9, 100, 99], 50, 30)
    ).toBeUndefined();

    expect(
      obterPrecosDentroDoOrcamento([10, 7, 8, 25, 8, 9, 100, 99], 9, 30)
    ).toEqual([10, 25, 9]);

    expect(
      obterPrecosDentroDoOrcamento([10, 7, 8, 25, 8, 9, 100, 99], 20, 30)
    ).toEqual([25]);
  });

  test("Deve retornar o desconto total.", () => {
    expect(obterDescontoTotal("Alimentação", "NULABSSA")).toEqual(40);

    expect(obterDescontoTotal("Alimentação", "ALURANU")).toEqual(40);

    expect(obterDescontoTotal("Infantil", "ALURANU")).toEqual(25);

    expect(obterDescontoTotal("Bebida", "ALURANU")).toEqual(10);

    expect(obterDescontoTotal("Bebida", "CUPOM-INVALIDO")).toEqual(0);

    expect(obterDescontoTotal("Alimentação", "CUPOM-INVALIDO")).toEqual(30);

    expect(obterDescontoTotal("KKK", "CUPOM-INVALIDO")).toEqual(0);
  });

  test("Deve calcular o total da compra com descontos.", () => {
    expect(calcularTotalDaCompraComDescontos([], 1, "foo")).toBeUndefined();

    expect(calcularTotalDaCompraComDescontos("foo", [], "foo")).toBeUndefined();

    expect(
      calcularTotalDaCompraComDescontos(
        [50, 25, 30, 22],
        ["Infantil", "Bebida", "Alimentação", "Bebida"],
        "ALURANU"
      )
    ).toEqual(97.8);

    expect(
      calcularTotalDaCompraComDescontos(
        [50, 25, 30, 22],
        ["Infantil", "Bebida", "Bebida", "Bebida"],
        "INVALIDO"
      )
    ).toEqual(119.5);
  });

  test("Deve capitalizar o nome completo.", () => {
    expect(capitalizarNomeCompleto("tiago lage payne de pádua")).toEqual(
      "Tiago Lage Payne de Pádua"
    );

    expect(capitalizarNomeCompleto("alexandre aquiles")).toEqual(
      "Alexandre Aquiles"
    );
  });
});

describe("Desafio", () => {
  const cupom1 =
    "Nome           Valor     Desconto  Imposto Total     \n" +
    "Serpentina     R$  20,00 R$   3,00         R$  17,00 \n" +
    "Refrigerante   R$   7,00 R$   0,00     15% R$   8,05 \n" +
    "Subtotal                                   R$  25,05 \n" +
    "Cupom de Desconto: NULABSSA                R$   2,51 \n" +
    "Total                                      R$  22,54";

  const cupom2 =
    "Nome           Valor     Desconto  Imposto Total     \n" +
    "Pipoca         R$  20,00 R$   6,00         R$  14,00 \n" +
    "Refrigerante   R$   7,00 R$   0,00     15% R$   8,05 \n" +
    "Subtotal                                   R$  22,05 \n" +
    "Cupom de Desconto: NULABSSA                R$   2,21 \n" +
    "Total                                      R$  19,84";

  test("Deve gerar o cupom fiscal.", () => {
    expect(gerarCupomFiscal([], 1, [], "foo")).toBeUndefined();

    expect(gerarCupomFiscal("foo", [], [], "foo")).toBeUndefined();

    expect(
      gerarCupomFiscal(
        ["Serpentina", "Refrigerante"],
        [20, 7],
        ["Infantil", "Bebida"],
        "NULABSSA"
      )
    ).toEqual(cupom1);

    expect(
      gerarCupomFiscal(
        ["Pipoca", "Refrigerante"],
        [20, 7],
        ["Alimentação", "Bebida"],
        "NULABSSA"
      )
    ).toEqual(cupom2);
  });
});
