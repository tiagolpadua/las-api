// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(seuNome) { 
    return `Olá, ${seuNome}`;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nomeCompleto) {
    return nomeCompleto.split(" ")[0];
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavra) { 
    palavra = palavra.toLowerCase();
    return palavra[0].toUpperCase() + palavra.slice(1);
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(preco, categoria) { 
    if (categoria === "Alimentação") {
        return 0;
    } else {
        return preco * 0.1;
    }
}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preco, categoria, cupom) { 
    if (categoria === "Alimentação" && cupom === "NULABSSA") {
        return preco * 0.5;
    } else {
        return preco;
    }
}

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(palavra, comprimento=5) { 
    let reticencias = "...";
    if (palavra.length > comprimento){
        return palavra.slice(0, comprimento)+reticencias;
    } else {
        return palavra;
    }
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) { 
    texto = texto.trim();
    if (texto === ""){
        return undefined;
    } else {
        return texto;
    }
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, 
// deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(string) {
    let splitted = string.split("/");
    let ano = parseInt(splitted[2]);
    let mes = parseInt(splitted[1])-1;    // o formato date conta os meses a partir do 0 = janeiro
    let dia = parseInt(splitted[0]);
    let dataAtual = new Date();
    let meses30 = [3, 5, 8, 10];

    if (splitted[0] === string) return NaN;

    if ((mes in meses30 && dia > 30) || (mes > 11 || mes < 0)
     || (dia > 31 || dia < 1) || (mes === 1 && dia > 29)) {
        return NaN;
    } else if (!(new Date(ano, 1, 29).getDate() === 29) && dia > 28) {
        return NaN;
    } else {
        return new Date(ano, mes, dia);
    }
}

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };