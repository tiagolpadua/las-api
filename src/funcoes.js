// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
<<<<<<< HEAD
function saudar(usuario) {
    return `Olá, ${usuario}`;
=======
function saudar(nome) {
    return `Olá, ${nome}`
>>>>>>> b478beee15138909a7a7a969b5b30644337c3523
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nome) {
<<<<<<< HEAD

    return nome.split(" ")[0];
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavra) {
    return palavra[0].toUpperCase() + palavra.replace(/^./, "").toLowerCase();
=======
    return `${nome.slice(0, 5)}`
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(nome) {
    return `${nome[0].toUpperCase() + nome.slice(1).toLowerCase()}`
>>>>>>> b478beee15138909a7a7a969b5b30644337c3523
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
<<<<<<< HEAD
function calculaImposto(precoOriginal, categoriaProduto) {

    return categoriaProduto !== "Alimentação" ? (precoOriginal * 10) / 100 : 0;

=======
function calculaImposto(valor, categoria) {
    if (categoria === "Alimentação") {
        return 0
    } else {
        return 1
    }
>>>>>>> b478beee15138909a7a7a969b5b30644337c3523
}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
<<<<<<< HEAD
function calculaDesconto(precoOriginal, categoriaProduto, cupom) {

    return categoriaProduto === "Alimentação" && cupom === "NULABSSA" ? precoOriginal - (precoOriginal * 50) / 100 : precoOriginal;


=======
function calculaDesconto(valor, categoria, cupom) {
    if (categoria === "Alimentação" && cupom === "NULABSSA") {
        return desconto = valor * 0.50

    } else {
        return valor
    }
>>>>>>> b478beee15138909a7a7a969b5b30644337c3523
}

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
<<<<<<< HEAD
function truncar(palavra, comprimento) {

    let comprimentoPadrao = comprimento === undefined ? 5 : comprimento;

    return palavra.length > comprimentoPadrao ? palavra.split("").slice(0, comprimentoPadrao).join("") + "..." : palavra;





=======
function truncar(texto, comprimento = 5) {
    if (texto.length > comprimento) {
        return `${texto.slice(0, comprimento) + "..."}`
    } else {
        return `${texto.slice(0, 6)}`
    }
>>>>>>> b478beee15138909a7a7a969b5b30644337c3523
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) {
<<<<<<< HEAD

    return texto.trim().length > 0 ? texto.trim() : undefined;
=======
    if (texto.trim() === "") {
        return undefined
    } else {
        return texto.trim()
    }
>>>>>>> b478beee15138909a7a7a969b5b30644337c3523
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
<<<<<<< HEAD
function validaData(data) {


    let mes = data.split("/")[1] > 0 && data.split("/")[1] <= 12 ? true : false;

    let dia = data.split("/")[0] > 0 && data.split("/")[0] <= 31 ? true : false;
    let anoAtual = new Date().getFullYear;

    let ano = data.split("/")[2]>1900 && data.split("/")[2]<= anoAtual? true : false;
    let lista=[10,30,20];
    lista.forEach((x,i)=>function(){
        console.log(x,"-",i);
    })
    

    return dia && mes && ano ? Date(ano, mes, dia) : NaN;




























=======
function validaData(dataDeNascimento) {
    let dia = dataDeNascimento.split("/")[0];
    let mes = dataDeNascimento.split("/")[1];
    let ano = dataDeNascimento.split("/")[2];
    let dataCorreta = `${mes + "/" + dia + "/" + ano}`
    if (Date.parse(dataCorreta)) {
        return "Ok"
    } else {
        return Date.parse(dataCorreta)
    }
>>>>>>> b478beee15138909a7a7a969b5b30644337c3523

}

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };