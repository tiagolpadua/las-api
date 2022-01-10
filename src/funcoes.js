// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(usuario) {
    return `Olá, ${usuario}`;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nome) {

    return nome.split(" ")[0];
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavra) {
    return palavra[0].toUpperCase() + palavra.replace(/^./, "").toLowerCase();
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(precoOriginal, categoriaProduto) {

    return categoriaProduto !== "Alimentação" ? (precoOriginal * 10) / 100 : 0;

}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(precoOriginal, categoriaProduto, cupom) {

    return categoriaProduto === "Alimentação" && cupom === "NULABSSA" ? precoOriginal - (precoOriginal * 50) / 100 : precoOriginal;


}

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(palavra, comprimento) {

    let comprimentoPadrao = comprimento === undefined ? 5 : comprimento;

    return palavra.length > comprimentoPadrao ? palavra.split("").slice(0, comprimentoPadrao).join("") + "..." : palavra;





}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) {

    return texto.trim().length > 0 ? texto.trim() : undefined;
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(data) {


    let mes = data.split("/")[1] > 0 && data.split("/")[1] <= 12 ? true : false;

    let dia = data.split("/")[0] > 0 && data.split("/")[0] < 31 ? true : false;

    let ano = data.split("/")[2] > 1970 ? true : false;

    return dia && mes && ano ? Date(ano, mes, dia) : NaN;


























}

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };