// =========
// Essencial
// =========

function checkAlimentationCategory(category) {
    return String(category).trim().toLowerCase() === 'alimentação';
}

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(name) {
    return `Olá, ${name}`;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(fullName) {
    return fullName ? fullName.split(' ')[0] : '';
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(word) {
    return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. 
// Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(price, category) {
    return checkAlimentationCategory(category) ? 0 : (price * 0.10);
}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. 
// Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(price, category, discount) {
    return checkAlimentationCategory(category)
        ? discount === 'NULABSSA'
            ? price / 2
            : price
        : price;
}

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(word, limit = 5) {
    return String(word).length > limit ? `${String(word).substr(0, limit)}...` : word;
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(word) {
    if (String(word).trim()) {
        return String(word).trim();
    }
    return undefined;
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(date) {
    const parts = String(date).split('/');
    
    if (parts.length !== 3  || Number(parts[0] > 31) || Number(parts[1]) > 28) return NaN;
    return new Date(date);
}

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };