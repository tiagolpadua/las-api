// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) {

    return `Olá, ${nome}`;

 }

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nome) { 

    const capturaNome = /\b[A-Z][a-z]+/g;

    const primeiroNome = capturaNome.exec(nome);

    return primeiroNome[0];

}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavra) {

    palavra = palavra.trim();

    let palavraFormatada = palavra[0].toUpperCase();
    
    for(let i = 1; i < palavra.length ; i++){
    
        palavraFormatada += palavra[i].toLowerCase()
      
    }
    
    return palavraFormatada
 }

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(preco , categoria) { 

    const taxaImposto = 0.1;

    const valorImposto = preco * taxaImposto;
    
    if(categoria === "Alimentação") return 0 ;
    
    else return valorImposto ;

    // return tipo === "Alimentação" ?  0 : valorImposto

    // Dúvida: O que mais conta ao escrever um código: inteligibilidade ou a econômia de linhas?

}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preco , categoria , cupom) {

    const taxaDesconto = 0.5;

    const valorComDesconto = preco * taxaDesconto;
    
    return categoria === "Alimentação" && cupom === 'NULABSSA' ?  valorComDesconto : preco ;

 }

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(palavra , limiteCaracteres = 5 ) {

    if(palavra.length <= limiteCaracteres) return palavra

    else if(palavra.length > limiteCaracteres) return palavra.substr(0 , limiteCaracteres) + "..."

 }

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) { 

    // const validaTexto = texto.trim();

    // if(!validaTexto) return undefined
    // else return validaTexto
        
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(data) {

//   let reg = /[0-3][0-9]\/[0-1][0-9]\/[1-2][0-9]+/g;

//   let arrayData = data.split("/");

//   let dataReverse = arrayData.reverse();

//   let dataFormatada = dataReverse.join("/", ",")

//   let objetoData = new Date(dataFormatada);


//     if(reg.test(data)){

//         return typeof objetoData

//     }else{

//         return NaN
//     }


 }

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };