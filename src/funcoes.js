// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) {
    return "Olá, " + nome;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nomeCompleto) { 
    var primeiroNome = nomeCompleto.split(" ");
    return primeiroNome[0];
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavra) {
    return palavra[0].toUpperCase() + palavra.slice(1).toLowerCase();
 }

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(preco, categoria) { 
    if(categoria === "Bebida"){
        return preco/100*10;
    } else{
        return 0;
    }

}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preco, categoria, cupom) {
    if(categoria === "Alimentação" && cupom === "NULABSSA"){
        return preco -= preco * 0.5;
    }if(categoria === "Alimentação" && cupom === "XPTO"){
        return preco;
    }if(categoria === "Bebida" && cupom === "NULABSSA"){
        return preco;
    }if(categoria === "Bebida" && cupom === "XPTO"){
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
function truncar(palavra, comprimentoMaximo = 5) {
    if(palavra.length > comprimentoMaximo){
        return palavra.substring(0,comprimentoMaximo) + "...";
    }if(palavra.length< comprimentoMaximo){
        return palavra;
    }
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) {
    if(texto == false){
        texto = undefined;
    }else{
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
    const divisor = data.split('/');

    if(divisor.length !== 3){
        return NaN;
    }

    const dia = divisor[0];
    const mes = divisor[1];
    const ano = divisor[2]; 

    if(dia > 28 && mes == 2){
        return NaN;
    }

    if(mes > 12 || mes < 1){
        return NaN;
    }

    if(mes == 1 || mes ==3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12){
        if( dia < 1 || dia > 31){
            return NaN;
        } else{
            return new Date(ano, mes, dia);
        }
    }
    if(mes == 4 || mes == 6 || mes == 9 || mes == 11){
        if (dia < 1 || dia > 30){
            return NaN;
        } else{
            return new Date(ano, mes, dia);
        }
    }
}



module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };