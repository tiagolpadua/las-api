// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) {
    return `Olá, ${nome}`
 }

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nome) { 
    const primeiroNome = nome.split(' ').slice(0,1).join(" ");
    return primeiroNome;
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(nome) { 
    const transformaNome =  nome.toLowerCase().replace(nome[0], nome[0].toUpperCase());
    return transformaNome;
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(precoOriginal, categoria) { 
    if(categoria === "Alimentação"){
        return 0;
    }else{
        const valorImposto = (precoOriginal * 10) / 100;
        return valorImposto;
    }
}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preco, categoria, cupom) {
    if(categoria === "Alimentação" && cupom === "NULABSSA"){
        const valorFinal = (preco * 50)/100;
        return valorFinal;
    }else{
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
function truncar(palavra, comprimento = 5) {
    if(palavra.length > comprimento){
       const truncar = palavra.slice(0,comprimento) + '...';
       return truncar;
    }else{
        return palavra;
    }
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) {
    if(texto.trim() === ""){
        return undefined;
    }else{
        const tiraEspaco = texto.trim();
        return tiraEspaco;
    }
 }

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(dataNascimento) { 
    const dia = dataNascimento.split('/').slice(0,1).join(" ");
    const mes = dataNascimento.split('/').slice(1,2).join(" ");
    const ano = dataNascimento.split('/').slice(2,3).join(" ");
    const anoAtual = new Date();
    const okay = 'ok';
    if(dia <= 28 && mes === 2 && ano <= anoAtual ){
        return okay;
    }else if(dia <= 30 && (mes != 4 || mes != 6 || mes != 9 || mes != 11) && mes <= 12 && ano <= anoAtual){
        return okay;
    }else if(dia <= 31 && (mes != 1 || mes != 3 || mes != 5 || mes != 7 || mes != 8 || mes != 10 || mes != 12) && mes <= 12 && ano <= anoAtual){
        return okay;
    }else{
        return NaN;
    }
  
}

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };