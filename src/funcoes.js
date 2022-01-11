// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) { 
    return "Olá, " +  nome;   
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nomeCompleto) {
    return nomeCompleto.match(/([A-Z][^\s]+)[^A-Z]+/).slice(1).join(' ');
 }

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(nome) { 

    return  `${nome.charAt(0).toUpperCase()}${nome.substring(1).toLowerCase()}`;
 
}


// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(preço, categoria) {

    let imposto;
    if (categoria === "Alimentação"){
        return imposto=0;
    }else {
       return valor =  preço * 0.1;
    }
 }


// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preço, categoria, cupom) {
    
    let precoDesconto;
    if (categoria === "Alimentação" && cupom === "NULABSSA" ){
      return precoDesconto = preço * 0.5;
    } else {
        return preço;
    }
 }

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(palavra = '', comprimento=5) { 
    
    if (palavra.length > comprimento){
      return palavra.slice(0, comprimento) + '...'
    } else {
        return palavra;
    }
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) { 
    
    if (texto.trim() == 0){ 
        return undefined; 
    }else{
        return (texto.trim());
    }
     
    }
    
// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN

function validaData(dataNascimento){


    let dia = dataNascimento.split('/')[0];
    let mes = dataNascimento.split('/')[1];
    let ano = dataNascimento.split('/')[2];
    
    var dataValida = `${mes}/${dia}/${ano}`;
    
        if (Date.parse(dataValida)) {
        return 'OK'
        }else{
        return Date.parse(dataValida);
        }
    }
    
     

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData }