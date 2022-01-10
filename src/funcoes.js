// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) {
    return "Olá, " + nome;
 }

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nomeCompleto) {
   return nomeCompleto.substring(5,0);
    
 }

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavra) { 
    return (palavra[0].toUpperCase() + palavra.slice(1).toLowerCase());
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(preco,categoria) {
    let valor=0;
    if(categoria=="Alimentação"){
        return valor;
    } else if (categoria=="Bebida"){
        valor=(preco*10)/100;
        return valor;
    }
    
 }

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preco,categoria,cupom) {
    let valor=0;
    if(categoria=="Alimentação" && cupom=="NULABSSA"){
        valor=(preco*50)/100;
        return preco-valor;
    } else{
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
function truncar(palavra,comprimento) { 
    if(palavra.length == comprimento){
        return palavra;
    }else{
        return palavra.substring(comprimento,0);
    }
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) { 
    if (texto===""){
        return undefined;
    } else if (texto==="    "){
        return undefined;
    } else {
        return texto.trim();
    }
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date se a data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(data) {
    var data=new Date();
    var dia = data.getDate();
    var dia_semana = data.getDay();
    var mes = data.getMonth();
    var ano = data.getFullYear();

    var str_data = dia + '/' + (mes+1) + '/' + ano;

    return str_data;

 }

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };