// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(name) {
    return `Olá, ${name}`;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(firstN) {
    return firstName = firstN.split(" ")[0];
 }

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(nameUpperAndLowerCase) { 
    return nameUpperAndLowerCase[0].toUpperCase() + nameUpperAndLowerCase.slice(1).toLowerCase();
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(price, product) {
    if (product === "Alimentação"){
        tax = 0;
    } else {
        tax = (price/100)*10;
    }
    return tax;
 }

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(price, product, coupon) {
    if((product === "Alimentação") && (coupon === "NULABSSA")){
        priceWithDiscount = price/2;
    } else {
        priceWithDiscount = price;
    }
    return priceWithDiscount;
 }

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(firstArgument, secondArgument = 5) { 
    if(firstArgument.length > secondArgument){
        firstArgument = firstArgument.substring(0,secondArgument) + "...";
    }
    return firstArgument 
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(textWithoutSpace) {
    if(textWithoutSpace == false){
        textWithoutSpace = undefined;
    } else {
        textWithoutSpace = textWithoutSpace.trim();
    }
    return textWithoutSpace;
 }

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(date) {
    let dateDividor = date.split("/");
    if (dateDividor.length != 3){
        return NaN;
    }
    let day = dateDividor[0];
    let month = dateDividor[1];
    let year = dateDividor[2];

    if(day < 1 || day > 31 || month < 1 || month > 12 || year >2022){
        return NaN;
    } else {
        return (day/month/year);
    }
 }

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };