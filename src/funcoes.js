// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) { 
   return `Olá, ${nome}`;
 }
// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nome) { 
    let primeiroNome = nome.split (' ');
    return primeiroNome[0];
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(nome) { 
    return nome[0].toUpperCase() + nome.slice(1).toLowerCase();
}
// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(precoProduto, categoriaProduto) { 
    if(categoriaProduto === 'Alimentação'){
        return 0; 
    }else{
         return 1;
    }
}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(precoOriginal, categoriaProduto, cupom) { 
 if(categoriaProduto === 'Alimentação' && cupom === 'NULABSSA'){
     return precoOriginal = precoOriginal*0.50;
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
function truncar(palavra, comprimentoMaximo=5) { 
    palavra = palavra.trim();
    let confere = Boolean(palavra);
    if(palavra != null || confere === true){
         if(palavra.length > comprimentoMaximo){
            palavra = palavra.substr(0,comprimentoMaximo)+'...';
            return palavra.substr(0,comprimentoMaximo+3);
        } else{
            return palavra;
        }
   }
}
// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) { 
    if(texto === null){
        return undefined
    }
    texto = texto.replaceAll(' ', '');
    let confere = Boolean(texto);
    if(confere === false&&texto != null){
        return undefined;
    }else{
        return texto;
    }
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date se a data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(data) { 
    let dataHoje = new Date();
    let dia = +data.substr(0,2);
    let mes = +data.substr(3,2);
    let ano = +data.substr(6,4);
 
    if((dia>0&&dia<=31)&&(mes>0&&mes<=12)&&(ano>=1970&&ano<=dataHoje.getFullYear())){
        return new Date(ano,mes,dia);
    } else {
        return NaN;
    }
 
}

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };