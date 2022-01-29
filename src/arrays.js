const { capitalizar } = require("./funcoes");

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
  if (listaOk(lista)) {
    let menorPreco = parseInt(lista[0]);

    for (var element of lista) {
      if (parseInt(element) < parseInt(menorPreco))
        menorPreco = parseInt(element);
    }
    // lista.forEach((element) => {
    //   if (element < menorPreco) menorPreco = element;
    // });

    //            Verificar element que era pra ser menorPreco
    return typeof element === "number" ? menorPreco : undefined;
  } else {
    return undefined;
  }
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
  if (listaOk(lista)) {
    let menorPreco = parseInt(lista[0]);

    for (var element of lista) {
      if (parseInt(element) > parseInt(menorPreco))
        menorPreco = parseInt(element);
    }
    // lista.forEach((element) => {
    //   if (element > menorPreco) menorPreco = element;
    // });

    // Verificar element que era pra ser menorPreco
    return typeof element === "number" ? menorPreco : undefined;
  } else {
    return undefined;
  }
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
  var nomesCapitalizados = [];

  if (listaOk(nomes)) {
    for (var element of nomes) {
      if (element.length > 3) nomesCapitalizados.push(capitalizar(element));
      else return undefined;
    }
    return nomesCapitalizados;
  } else return undefined;
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
  const categorias = ["Alimentação", "Infantil"];
  const descontos = [30, 15];

  const desconto =
    descontos[categorias.findIndex((element) => element === categoria)];
  return desconto !== undefined ? desconto : 0;
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
  const precosOrcamento = [];
  if (listaOk(lista)) {
    for (var element of lista) {
      if (parseInt(element) <= precoMaximo) {
        precosOrcamento.push(element);
      }
    }
    return precosOrcamento;
  } else return undefined;
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
  if (listaOk(lista)) {
    var totalCompra = 0;
    for (const element of lista) {
      totalCompra += element;
    }
    return totalCompra;
  } else return undefined;
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
  const menor = obterMenorPreco(lista);
  const maior = obterMaiorPreco(lista);
  const listaMenorMaior = [];

  if (menor !== undefined && maior !== undefined) {
    listaMenorMaior.push(menor);
    listaMenorMaior.push(maior);
    return listaMenorMaior;
  } else return undefined;
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]

// [10,7,8,25,8,9,100,99,]

function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
  const precosOrcamento = [];
  if (listaOk(lista) && menorValor < maiorValor) {
    for (var element of lista) {
      if (parseInt(element) >= menorValor && parseInt(element) <= maiorValor) {
        precosOrcamento.push(element);
      }
    }
    return precosOrcamento;
  } else return undefined;
}

// Crie uma função que recebe uma categoria e um cupom e aplica um acréscimo de 10% no desconto da categoria, se o cupom for válido
// Utilize a função obterDescontoCategoria
// ('Alimentação', 'NULABSSA') => 40
// ('Alimentação', 'ALURANU') => 40
// ('Infantil', 'ALURANU') => 25
// ('Bebida', 'ALURANU') => 10
// ('Bebida', 'CUPOM-INVALIDO') => 0
// ('Alimentação', 'CUPOM-INVALIDO') => 30
// Utilize a função descontoCategoria criada anteriormente
function obterDescontoTotal(categoria, cupom) {
  var desconto = obterDescontoCategoria(categoria);
  if (cupom === "NULABSSA" || cupom === "ALURANU") {
    return (desconto += 10);
  } else return desconto;
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
  var valorTotalCompraComDesconto = 0;
  var valorCompra = 0;

  if (listaOk(precos) && listaOk(categorias)) {
    for (let i = 0; i < categorias.length; i++) {
      valorCompra =
        precos[i] -
        (precos[i] *= obterDescontoTotal(categorias[i], cupom) / 100);
      valorTotalCompraComDesconto += valorCompra;
    }
    return valorTotalCompraComDesconto;
  } else return undefined;
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
  const nomeDividido = nomeCompleto.split(" ");
  var nomeCompletoCapitalizado = "";
  nomeDividido.forEach((palavra, indice) => {
    if (palavra.length >= 3) {
      nomeCompletoCapitalizado += capitalizar(palavra);
    } else {
      nomeCompletoCapitalizado += palavra;
    }
    if (indice !== nomeDividido.length - 1) {
      nomeCompletoCapitalizado += " ";
    }
  });
  return nomeCompletoCapitalizado;
}

// =======
// Desafio
// =======

// Crie uma função que recebe uma lista de preços e categorias e devolve um cupom fiscal conforme abaixo:
// (['Serpentina', 'Refrigerante'], [20, 7], ['Infantil', 'Bebida'], 'NULABSSA') =>
// Nome           Valor     Desconto  Imposto Total
// Serpentina     R$  20,00 R$   5,00     15% R$  18,00
// Refrigerante   R$   7,00 R$   0,70         R$   6,30
// Subtotal                                   R$  24,30
// Cupom de Desconto: NULABSSA                R$   3,00
// Total                                      R$  21,30
function gerarCupomFiscal(
  listaNomesProdutos,
  listaPrecosProdutos,
  listaCategoriasProdutos,
  cupom
) {
  if (
    listaOk(listaNomesProdutos) &&
    listaOk(listaPrecosProdutos) &&
    listaOk(listaCategoriasProdutos)
  ) {
    var subtotal = 0;
    var descontoCupom = cupom === "NULABSSA" ? 3 : 0;

    var cupomFiscal = `Nome           Valor     Desconto  Imposto Total     `;

    cupomFiscal += "\n";

    for (let i = 0; i < listaNomesProdutos.length; i++) {
      let desconto =
        listaPrecosProdutos[i] *
        (obterDescontoTotal(listaCategoriasProdutos[i], cupom) / 100);

      cupomFiscal += padronizaTamPalavra(listaNomesProdutos[i], "nome");

      cupomFiscal += `R$ ${padronizaTamPalavra(
        parseFloat(listaPrecosProdutos[i])
          .toFixed(2)
          .toString()
          .replace(".", ","),
        "valor"
      )} `;

      cupomFiscal += padronizaTamPalavra(
        `R$   ${desconto.toFixed(2).toString().replace(".", ",")}`,
        "desconto"
      );

      if (i === 0) {
        cupomFiscal += "    15%";
        cupomFiscal += padronizaTamPalavra(
          ` R$  ${(
            listaPrecosProdutos[i] +
            listaPrecosProdutos[i] * 0.15 -
            desconto
          )
            .toFixed(2)
            .toString()
            .replace(".", ",")} `,
          "total"
        );
        subtotal +=
          listaPrecosProdutos[i] + listaPrecosProdutos[i] * 0.15 - desconto;
      } else {
        cupomFiscal += padronizaTamPalavra("", "imposto");
        cupomFiscal += `R$   ${padronizaTamPalavra(
          parseFloat(listaPrecosProdutos[i] - desconto)
            .toFixed(2)
            .toString()
            .replace(".", ","),
          "total"
        )}`;
        subtotal += listaPrecosProdutos[i] - desconto;
      }
      cupomFiscal += "\n";
    }

    cupomFiscal += `Subtotal                                   R$  ${subtotal
      .toFixed(2)
      .toString()
      .replace(".", ",")} \n`;

    cupomFiscal += `Cupom de Desconto: ${cupom}                R$   ${descontoCupom
      .toFixed(2)
      .toString()
      .replace(".", ",")} \n`;

    cupomFiscal += `Total                                      R$  ${(
      subtotal - descontoCupom
    )
      .toFixed(2)
      .toString()
      .replace(".", ",")}`;

    return cupomFiscal;
  } else return undefined;
}

// FUNÇÕES AUXILIARES

function listaOk(lista) {
  if (!Array.isArray(lista) || lista.length === 0) {
    return false;
  } else {
    return true;
  }
}

function padronizaTamPalavra(palavra, campo = "defalt") {
  var tamPadrao = 0;

  tamPadrao = campo === "defalt" || campo === "nome" ? 15 : 10;

  switch (campo) {
    case "defalt":
    case "nome":
      tamPadrao = 15;
      break;
    case "imposto":
      tamPadrao = 8;
      break;
    case "valor":
      tamPadrao = 6;
      break;
    case "total":
      tamPadrao = 5;
      break;
    default:
      break;
  }

  if (campo === "valor") {
    let palavraAux = "";
    for (let i = 0; i < tamPadrao - palavra.toString().length; i++) {
      palavraAux += " ";
    }
    return palavraAux + palavra;
  }

  if (palavra === undefined) {
    return "";
  } else {
    while (palavra.toString().length < tamPadrao) {
      palavra += " ";
    }
    return palavra;
  }
}

function precoProdutoComDesconto(preco) {}

module.exports = {
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
};
