// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) {
    return `Olá, ${nome}`
 }

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome() { 
    let nomeCompleto = "Tiago Lage Payne de Pádua";
    let primeiroNome = nomeCompleto.substring(0, nomeCompleto.indexOf(" "));
    return primeiroNome;
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavra) { 
    let toLowerCase = palavra.toLowerCase();
    let capitalized = toLowerCase[0].toUpperCase() + toLowerCase.substring(1);
    return capitalized;
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(precoOriginal, categoriaDoProduto) { 
    let valorDoImposto = 0;
    if(categoriaDoProduto === "Alimentação"){
        valorDoImposto = 0;
    }else{
        valorDoImposto = ((10*precoOriginal)/100);
    }
    return valorDoImposto;
}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(precoOriginal, categoriaDoProduto, cupomDeDesconto) {
    let precoComDesconto = 0, desconto = 0;;

    if(categoriaDoProduto === "Alimentação" && cupomDeDesconto === "NULABSSA"){
        desconto =  ((50*precoOriginal)/100);
        precoComDesconto = precoOriginal - desconto;
    }else{
        precoComDesconto = precoOriginal;
    }
    return precoComDesconto;
 }
 

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(palavra, comprimentoMaximo) { 
    let palavraTruncada = palavra.substring(0, comprimentoMaximo);
    return palavraTruncada;
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) {
    if(texto.trim().length != 0){
        return texto.trim();
      }else{
          return undefined;
      }
 }

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(dataDeNascimento) { 
    let valida = dataDeNascimento instanceof Date && !isNaN(dataDeNascimento);
    if(!valida){
        return "Nan";
    }else{
        return "Ok";
    }
}

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };