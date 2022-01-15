// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
const saudar = nome => `Olá, ${nome}`;

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nome) { 
    let nomeCompleto = nome.split(' ');
    return nomeCompleto[0];    
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(nome) { 
    let palavra = nome.split();
    return  nome[0].toUpperCase() + nome.slice(1).toLowerCase();    
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(preco, categoria) {
    let resultado = categoria === "Alimentação" ?  0 : preco / 100 * 10;
    return resultado;
 }

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preco, categoria, cupomDesconto) {
    let resultado = categoria === "Alimentação" && cupomDesconto === "NULABSSA" ? preco * 0.5 : preco * 1;
    return resultado;
 }

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(palavra, tamanho) { 
    let resultado = "";
    let tamMaximo = 5;    
    let comprimento = comprimentoMax(tamanho);

        if (typeof tamanho === "undefined"){
            for (let i = 0; i < 8; i++){
                (i < comprimento ? resultado += palavra[i] : resultado += ".");                
            }
            return resultado;
        }else{
            if (palavra.length > comprimento ){
                for (let i = 0; i <= palavra.length; i++){
                    (i < comprimento ? resultado += palavra[i] : resultado += ".");                           
                }
                return resultado;                        
            }else {
                resultado = palavra;
                return resultado;
            }
        }         
    
    function comprimentoMax (valor){
        let valor1 = valor;
            (typeof valor1 === "undefined" ? valor1 = tamMaximo : valor1 = valor);
            return valor1;         
    }   
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido() { }

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData() { }

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };