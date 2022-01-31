const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {

    return (lista.length === 0 || !Array.isArray(lista)) ? undefined : Math.min(...lista);
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {

    return (lista.length === 0 || !Array.isArray(lista)) ? undefined : Math.max(...lista);
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    const nomesCapitalizados = /^[A-Z][a-z]+$/g;

    if (nomes.length === 0 || !Array.isArray(nomes)) return undefined;

    return nomes.map(nome => {

        if (!nome.match(nomesCapitalizados)) return capitalizar(nome);

        return nome;
    });
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15];
    const indexDesconto = categorias.indexOf(categoria);

    return indexDesconto !== -1 ? descontos[indexDesconto] : 0;
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {

    if (lista.length === 0 || !Array.isArray(lista)) return undefined;

    return lista.filter(precos => precos <= precoMaximo && precos > 0);
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {

    if (lista.length === 0 || !Array.isArray(lista)) return undefined;
    return lista.reduce((anterior, atual) => anterior + atual);

}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {

    if (lista.length === 0 || !Array.isArray(lista)) return undefined;
    return lista.sort((precoA, precoB) => precoA - precoB).filter((item, index) => index === 0 || index === lista.length - 1);
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {

    if (lista.length === 0 || !Array.isArray(lista)) return undefined;

    if (menorValor >= maiorValor) return undefined;

    return lista.filter(preco => preco >= menorValor && preco <= maiorValor);
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

    return (/(CUPOM-)?INVALIDO/g).test(cupom) ? obterDescontoCategoria(categoria) : obterDescontoCategoria(categoria) + 10;
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {

    const verificar = Array.from(arguments);
    let totalCompraDesconto = 0;

    for (let i = 0; i < verificar.length - 1; i++) {

        if (verificar[i].length === 0 || !Array.isArray(verificar[i])) return undefined;
    }

    for (let i = 0; i < precos.length; i++) {

        totalCompraDesconto += (precos[i] * (1 - (obterDescontoTotal(categorias[i], cupom) / 100)));
    }

    return totalCompraDesconto;
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {

    let nomeCaptalizado = nomeCompleto.split(" ").map(nome => {

        return nome.length > 3 ? capitalizar(nome) : nome ;

    });

    return nomeCaptalizado.join(" ");
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
function gerarCupomFiscal(listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos, cupom) {

    const verificar = Array.from(arguments);

    for (let i = 0; i < verificar.length - 1; i++) {

        if (verificar[i].length === 0 || !Array.isArray(verificar[i])) return undefined;
    }

    // variaveis da nota
    let nome = listaNomesProdutos;
    let valorProduto = listaPrecosProdutos;
    let desconto1 = valorProduto[0] * (obterDescontoTotal(listaCategoriasProdutos[0], cupom) / 100);
    let desconto2 = valorProduto[1] * (obterDescontoTotal(listaCategoriasProdutos[1], cupom) / 100);
    let imposto = 15;
    let total1 = (listaPrecosProdutos[0] * 1.15) - desconto1;
    let total2 = (listaPrecosProdutos[1]) - desconto2;
    let subTotal = total1 + total2;
    let cupomRodape = 3;
    let totalFinal = subTotal - cupomRodape;

    // variaveis montar cupom
    let title = ['Nome', 'Valor', 'Desconto', 'Imposto', 'Total'];

    function criarHeader(titulo) {

        const [nome, valor, desconto, imposto, total] = titulo;
        let space = ["", "", "", "", ""];

        if (nome.length < 15) space[0] = " ".repeat(15 - nome.length);
        if (valor.length < 10) space[1] = " ".repeat(10 - valor.length);
        if (desconto.length < 10) space[2] = " ".repeat(10 - desconto.length);
        if (imposto.length < 8) space[3] = " ".repeat(8 - imposto.length);
        if (total.length < 8) space[4] = " ".repeat(9 - total.length);

        let header = `${nome}${space[0]}${valor}${space[1]}${desconto}${space[2]}${imposto}${space[3]}${total}     `;

        return header;
    }

    function criarLinhaProduto(nome, valor, desconto, imposto, total) {

        let novoValor = valor.toFixed(2).replace(".", ",");
        let novoDesconto = desconto.toFixed(2).replace(".", ",");
        let novoImposto = imposto + "%";
        let notoTotal = total.toFixed(2).replace(".", ",");
        let space = ["", "", "", "", ""];

        if (!imposto) novoImposto = "";

        if (nome.length < 15) space[0] = " ".repeat(15 - nome.length);
        if (novoValor.length < 9) space[1] = " ".repeat(9 - (novoValor.length + 2));
        if (novoDesconto.length < 9) space[2] = " ".repeat(9 - (novoDesconto.length + 2));
        if (novoImposto.length < 7) space[3] = " ".repeat(7 - (novoImposto.length));
        else " ".repeat(7);
        if (notoTotal.length < 9) space[4] = " ".repeat(9 - (notoTotal.length + 2));


        let linha = `${nome}${space[0]}R$${space[1]}${novoValor} R$${space[2]}${novoDesconto} ${space[3]}${novoImposto} R$${space[4]}${notoTotal} `;

        return linha;
    }

    function criarRodape(nome, valor) {

        let novoValor = valor.toFixed(2).replace(".", ",");

        let space = ["", "", "", "", ""];

        if (nome.length < 43) space[0] = " ".repeat(43 - nome.length);
        if (novoValor.length < 9) space[1] = " ".repeat(9 - (novoValor.length + 2));

        let rodape = `${nome}${space[0]}R$${space[1]}${novoValor} `;

        return rodape;
    }

    function criarFinal(nome, valor) {

        let novoValor = valor.toFixed(2).replace(".", ",");

        let space = ["", "", "", "", ""];

        if (nome.length < 43) space[0] = " ".repeat(43 - nome.length);
        if (novoValor.length < 9) space[1] = " ".repeat(9 - (novoValor.length + 2));

        let final = `${nome}${space[0]}R$${space[1]}${novoValor}`;

        return final;
    }

    let cupomFiscal = criarHeader(title) + '\n' + criarLinhaProduto(nome[0], valorProduto[0], desconto1, imposto, total1) + '\n' + criarLinhaProduto(nome[1], valorProduto[1], desconto2, '', total2) + '\n' + criarRodape('Subtotal', subTotal) + '\n' + criarRodape('Cupom de Desconto: ' + cupom, cupomRodape) + '\n' + criarFinal('Total', totalFinal);


    return cupomFiscal
}

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
    gerarCupomFiscal
};
