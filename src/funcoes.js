// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) {
    return `Olá, ${nome}`;
 }

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nomeCompleto) {
    const primeiroNome = nomeCompleto.split(" ")[0];
    return primeiroNome;
 }

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavra) { 
    let primeiraLetra = palavra[0].toUpperCase();
    let restante = palavra.substr(1).toLowerCase();
    return primeiraLetra + restante;
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(valor, categoria) {
    if (categoria === "Alimentação") {
        console.log(`-------- ISENTO DE IMPOSTO --------`)
        return 0;
    } else {
        let precoFinal = valor / 10;
        console.log(`----- IMPOSTO 10%: R$ ${precoFinal} -----`)
        return precoFinal;
    }
 }

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preço, categoria, cupom) {
    if (categoria === "Alimentação" && cupom === "NULABSSA") {
        preçoFinal = preço * .5;
    } else {
        preçoFinal = preço;
    }
    return preçoFinal;
 }

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(palavra, comprimentoMax = 5) {
    if (palavra.length > comprimentoMax) {
        palavra = palavra.slice(0, comprimentoMax) + "...";
    }
        return palavra;    
 }

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) { 
    texto = texto.trim();
    if (texto.length > 0) {
        return texto;
    } else {
        return undefined;
    }
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date se a data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(data) {
    const divideData = data.split("/");
    if (divideData.length !== 3) {
        return NaN;
    }

    const dia = divideData[0];
    const mes = divideData[1];
    const ano = divideData[2];

    if (ano % 4 === 0) {
        anoBicesto = true;
    } else {
        anoBicesto = false;
    }

    if (mes === 2) {
        if (anoBicesto && dia > 29 || !anoBicesto && dia > 28) {
            return NaN;
        }
    }

    if (mes === 4 || mes === 6 || mes === 9 || mes === 11) {
        if (dia < 1 || dia > 30) {
            return NaN;
        } else {
            return `${dia}/${mes}/${ano}`;
        }
    }

    if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano > new Date().getFullYear()) {
        return NaN; 
    } else {
        return `${dia}/${mes}/${ano}`;
    }
 }

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };