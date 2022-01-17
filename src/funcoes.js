// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) {
    return `Olá, ${nome}`
 }

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nome) {
    let primeiroNome = nome.split(' ').slice(0, 1).join(' ');
    return primeiroNome;
 }

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(x) {
    let nome = x;
    return nome[0].toUpperCase() + nome.slice(1).toLowerCase();
 }

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(x, y) {
    let preco = x;
    let categoria = y;
    if (categoria != "Alimentação"){
        return 1
    } else {
        return 0
    }
 }

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(p, c, d) {
    let preco = p;
    let categoria = c;
    let desconto = d;
    if((categoria === "Alimentação") && (desconto === "NULABSSA")){
        return preco / 2;
    }else {
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
function truncar(p, c = 5) {
    let palavra = p;
    let comprimento = c;
    let text = "...";
    if(palavra.length > comprimento){
        return palavra.substring(0, comprimento) + text;       
    }else{
        return palavra;
    } 
 }

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(t) {
    let texto = t;
    if(texto == 0){
        return undefined;
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
function validaData(param){
    let dia = Number(param.slice(0, 2));
    let mes = Number(param.slice(3, 5));
    let ano = Number(param.slice(6));
    let diaOk = false;
    let mesOk = false;
    let anoOk = false;

    if(dia <= 31){
        if(dia > 0){
            diaOk = true; 
        }else{
            diaOk = false;
        }
    }else{
        diaOk = false;
    }
    
    if(mes >= 1){
        if(mes <=12){
            mesOk = true; 
        }else{
            mesOk = false;
        }
    }else{
        mesOk = false;
    }

    if(ano > 1900){
        if(ano <= 2022){
            anoOk = true; 
        }else{
            anoOk = false;
        }
    }else{
        anoOk = false;
    }

    if(diaOk && mesOk && anoOk){
        return "Ok"
    }else{
        return NaN
    }
    
}

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };