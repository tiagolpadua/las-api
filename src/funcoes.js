// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(name) { 
  return  `Olá, ${name}`;
}

// Escreva uma função que clearreceba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(fullName) { 
   const firstName = fullName.split(' ').shift();
    return firstName;
}
//console.log(extrairPrimeiroNome("Tauane Sales"))

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(word) { 
    const capitalized = word[0].toUpperCase() + word.substr(1) ;
    sli = capitalized.slice(1, );
    return capitalized[0] + sli.toLowerCase();
}
//console.log(capitalizar("tAUANE"));

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(precoOriginal, categoriaProduto) { 
    if (categoriaProduto != "Alimentação") { 
        return precoOriginal*10/100; }
        else{
            return 0;  }
}
//console.log(calculaImposto(10,'Bebida'));

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(precoOriginal, categoriaProduto, cupom) { 
    if ((categoriaProduto === "Alimentação") && (cupom==="NULABSSA")) { 
        return precoOriginal-(precoOriginal*50/100);
    }
    else{
        return precoOriginal;
    }
}
//console.log(calculaDesconto(30,"Alimentação","NULABSSA"));

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(word,lengthMax = 5) { 
    if ((word.length>0) && (word.length>lengthMax)){
        return word.slice(0, lengthMax)+"...";
        }
        else {
            return word;
        }
    }
console.log(truncar("Tau", 2));

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(text) { 
    if ((text.length != "") && (text.trim().length != "")) {
        return text.trim();
    }
       else {
           return undefined;
    }
}
console.log(validaTextoPreenchido(" Tauane"));

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(dataNascimento) {

 }

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };