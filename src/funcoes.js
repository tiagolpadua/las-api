// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) { 
    return `Olá, ${nome}`;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nomeCompleto) { 
//Tiago Lage Payne de Pádua -> Tiago
    const primeiroNome = nomeCompleto.split(' ');
    return primeiroNome[0];
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavra) { 
    const primeiraLetra = palavra.substr(0,1).toUpperCase();
    const restanteDaPalavra = palavra.substr(1).toLowerCase();

    return primeiraLetra.concat(restanteDaPalavra);
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(precoOriginal, categoria) { 
    let percentualImposto = 10;
    let impostoSobProduto = (precoOriginal * percentualImposto)/100;
    
    return categoria === "Alimentação"? impostoSobProduto = 0:impostoSobProduto;
}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(precoOriginal, categoria, cupomDesconto) { 

    const cupomValido = "NULABSSA";
    const percentualDesconto = 50;
    const descontoSobProduto = (precoOriginal * percentualDesconto)/100;

    if(categoria === "Alimentação" && cupomDesconto === cupomValido){
        return precoOriginal - descontoSobProduto;
    }else{
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
function truncar(palavra, comprimentoMax = 5) { 
    
    const comprimentoPadrao = 5;
    const palavraSemEspacos = palavra.trim();

    if(palavraSemEspacos.length === 0){
        
        return undefined;

    }else if(palavraSemEspacos.length <= comprimentoMax){
        
        return palavraSemEspacos.trim();
        //teste   5  ->              //4                                     //5
    }else if(palavraSemEspacos.length > comprimentoMax && comprimentoMax <= comprimentoPadrao){
        
        //console.log(`Tamanho da palavra: ${palavraSemEspacos.length}`);
        return palavraSemEspacos.substring(0, comprimentoMax).concat('...');
    }else{
        
        return palavraSemEspacos.substring(0, comprimentoPadrao).trim();
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