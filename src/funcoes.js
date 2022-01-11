// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) { 
    return `Olá, ${nome}`;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nomeCompleto) {
    const nome=nomeCompleto.split(' ');

    return nome[0];
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavra) {
    let minuscula=palavra.toLowerCase();
    let final=minuscula.replace(/^./, "");
    const capitalizar=palavra[0].toUpperCase() + final;
    
    return capitalizar;
 }

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. 
//Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(preco,categoria) {
    if(categoria === 'Alimentação'){
        return 0;
    }else{
        imposto=preco*0.1;
        return imposto;
    }
 }

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula
//o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de
//50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preco,categoria,cupom) { 
    if(categoria === "Alimentação" && cupom === "NULABSSA"){
        desconto=preco*0.5;
        return desconto;
    }else{
        return preco
    }
}

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo 
//argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(palavra,comprimento=5) {
    let newPalavra;
    if(palavra.length>comprimento){
        newPalavra=palavra.substring(0,comprimento) + "...";
        return newPalavra;

    }else{
        return palavra;
    }
 }

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes
//ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) {
    if(texto ==='' || texto.trim()===''){
        return undefined;
    }else{
        newTexto=texto.trim();
        return newTexto;
    }
 }

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(data) {
    const hoje= new Date();
    const anoHoje=hoje.getFullYear();
    let dateArray=data.split('/');

    if(dateArray[2]<=anoHoje){
        if(dateArray[1]<=12 && dateArray[1]>0){
            if(dateArray[0]<=31 && dateArray[0]>0){
                return true;
            }else{
                return NaN;
            }
        }else{
            return NaN;
        }
    }else{
        return NaN;
    }
 }

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };