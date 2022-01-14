// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) {
    return `Olá, ${nome}`;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago

function extrairPrimeiroNome(nomeCompleto) {

    let separarNome = nomeCompleto.split(" ");
    primeiroNome = separarNome[0];
    return primeiroNome
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago

function capitalizar(palavra) {

    return (palavra[0].toUpperCase() + palavra.slice(1).toLowerCase())
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1


function calculaImposto(preco, produto) {

    let imposto = 0
    if (produto === "Alimentação") {
        imposto = imposto
    }
    else {
        imposto = imposto + preco * 0.1
    }
    return imposto
}



// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preco, produto, cupom) {

    let precoDesconto = 0

    if (produto === "Alimentação" && cupom === "NULABSSA") {
        precoDesconto = preco * 0.5
    }
    else {
        precoDesconto = preco
    }
    return precoDesconto
}

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...

function truncar(palavra, comprimento = 5) {

    if (palavra.length > comprimento) {
        palavra = palavra.substring(0, comprimento) + "...";
    }
    return palavra;
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"

function validaTextoPreenchido(texto) {

    if (texto.trim() !== "") {
        return texto.trim();
    }
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(data) {

    function toDate(dateStr) {
        var parts = dateStr.split("/");

    }

    let separaData = data.split("/");

    let dia = separaData[0]
    let mes = separaData[1]
    let ano = separaData[2]

    let verificaData = `${dia}/${mes}/${ano}`;

    if ((dia >= 1 && dia <= 31) && (mes >= 1 && mes <= 12) && (ano >= 1900 && ano <= 2022)) {

        return verificaData;

    } else if ((dia < 1 || dia > 31) && (mes < 1 || mes > 12) && (ano < 1900 || ano > 2022)) {

        return NaN;
    }

}



module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };