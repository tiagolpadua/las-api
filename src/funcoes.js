// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago

let saudar = (nome) => `Olá, ${ nome }`;

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago

let extrairPrimeiroNome = (nomeCompleto) => nomeCompleto.split(" ").shift();

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago

let capitalizar = (pesquisar) => pesquisar[0].toUpperCase() + pesquisar.slice(1).toLowerCase();

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1

/*function calculaImposto(preco, categoria) {
    if (categoria != 'Alimentação') {
        return (preco * (10 / 100));
    } else {
        return 0;
    }
}*/

let calculaImposto = (preco, categoria) => categoria != 'Alimentação' ? preco * (10 / 100) : 0;

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10

/*
function calculaDesconto(preco, categoria, cupom) {
    if (categoria === 'Alimentação' && cupom === 'NULABSSA') {
        return (preco * (50 / 100));
    } else {
        return preco;
    }

} */

let calculaDesconto = (preco, categoria, cupom) => categoria === 'Alimentação' && cupom === 'NULABSSA' ? preco * (50 / 100) : preco;

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...

/*function truncar(palavra, length = 5) {
    if (palavra.length > length) {
        return palavra.slice(0, length) + '...';
    } else {
        return palavra;
    }
} */

let truncar = (palavra, length = 5) => palavra.length > length ? palavra.slice(0, length) + '...' : palavra;

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
let validaTextoPreenchido = (texto) => {
    let validaTexto = texto.trim();
    if (!validaTexto) return undefined
    else return validaTexto
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date se a data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN

let validaData = (data) => {
    let x = /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}/;
    return x.test(data) ? true : NaN;
}

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };