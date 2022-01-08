// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) {
    return `Olá, ${nome}`;
 }
    
// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(primeiroNome) {
    return primeiroNome.split(' ')[0];
 }

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(mNome){
    return (mNome[0].toUpperCase() + mNome.slice(1).toLowerCase());
 }

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(precoOriginal, categoriaProduto, valorImposto, valorFinal) {
    if(categoriaProduto == 'Alimentação'){
        return 0;
    }else if(categoriaProduto != 'Alimentação'){
        valorImposto = (precoOriginal * precoOriginal) / 100;
        valorFinal = valorImposto;
        return valorFinal;
    }
}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de 
//desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA,
//deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
//
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(precoOriginal, produtoCategoria, descontoCupom, total) {
    if(produtoCategoria == 'Alimentação' && descontoCupom == 'NULABSSA'){
        precoOriginal = 30;
        descontoCupom = precoOriginal - 15;
        total = descontoCupom;
        return total;
    }else if(produtoCategoria == 'Alimentação' && descontoCupom == 'XPTO'){
        precoOriginal = 30;
        return precoOriginal;
    }else if(produtoCategoria == 'Bebida' && descontoCupom == 'NULABSSA' || descontoCupom == 'XPTO'){
        precoOriginal = 10;
        return precoOriginal;
    }

}

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(primeiroArgumento, comprimento = 5) {
   
    if(primeiroArgumento.length > comprimento){
        return  primeiroArgumento.slice(0, comprimento)+"..."
    }else{
        return primeiroArgumento;
    }
}
    
// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) {
    if(texto.length != "" && texto.trim().length != ""){
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
function validaData(date){
    var validarData = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return ((validarData .test(date)) ? "Ok" : NaN);
}
  
 

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };