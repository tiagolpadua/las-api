// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) {
    return (`Olá, ${nome}`);
};

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nomeCompleto) { 
    let primeiroNome=nomeCompleto.split(" ");
    return primeiroNome[0];
};

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(primeiraMaiuscula) {
    return primeiraMaiuscula[0].toUpperCase() + primeiraMaiuscula.slice(1).toLowerCase();
 };

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(precoOriginalImposto, categoriaProdutoImposto) {
    if (categoriaProdutoImposto === "Alimentação"){
        return 0;
    };
    if (categoriaProdutoImposto === "Bebida"){
        return precoOriginalImposto*0.10;
    };
 };
// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(precoOriginalDesconto,categoriaProdutoDesconto, cumpomDesconto) { 
  if (cumpomDesconto === 'NULABSSA' && categoriaProdutoDesconto === 'Alimentação'){
        return precoOriginalDesconto-=precoOriginalDesconto*0.5;
    }else{return precoOriginalDesconto};
};

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(palavraTruncar, comprimentoPalavra) { 
    if(comprimentoPalavra === undefined){
        return (`${palavraTruncar.substr(0,5)}...`);
    };
    if (palavraTruncar.length <= comprimentoPalavra){
        return palavraTruncar;
    }else{
        return (`${palavraTruncar.substr(0,(comprimentoPalavra))}...`);
         };
};

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(textoRecebido) { 
   if(textoRecebido.trim() === ""){
       return   undefined;
   }else return textoRecebido.trim();
};
// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(inputDate){ 
    //entrada de dados/criação de variaveis/ verificar entrada.    
        const data = new Date();
        
    //String com data Atual
        const dataAtual={
                dia:(String(data.getDate())).padStart(2, "0"),
                mes:(String(data.getMonth()+1)).padStart(2,"0"),
                ano:(String(data.getFullYear())),
            };
            
    //separar dia / mes / ano  
        const dataNascimento= inputDate.split("/", 3);
        let diaNascimento= dataNascimento[0];
        let mesNascimento= dataNascimento[1];
        let anoNascimento= dataNascimento[2];
        const dataNascimentoCompleta = (`${diaNascimento}/${mesNascimento}/${anoNascimento}`);
            
    
    //verificação de entrada é uma Data.
        let ehUmNumero = (Number.isNaN(Number((diaNascimento+mesNascimento+anoNascimento))));         
        if(ehUmNumero){return NaN;};
       
    
    //condições para legitimar a entrada de dados

        //função para verificar qntd de dias do mes inserido
        function diasNoMes(ano, mes){
        let numeroDeDias= new Date(ano, mes, 0);
        return numeroDeDias.getDate();
        };
        let diaMax=diasNoMes(anoNascimento, mesNascimento);
        
        //verificar o ano
        if (Number(anoNascimento) > Number(dataAtual.ano)){
             return NaN;
        };       
        
    
        //verificar o mes
        if(mesNascimento > 12){ 
            return NaN;
        };
           
    
        //verificar o dia
        if (diaNascimento > diaMax || diaNascimento< 0){
             return NaN;
        };

    
        //ultima função de validação da data de nascimento
            let anoIgual= (Number(anoNascimento) === Number(dataAtual.ano));
            let mesIgual= (Number(mesNascimento) === Number(dataAtual.mes));

            //mesmo ano / mesmo mes/ dia maior
                if(anoIgual && mesIgual && (Number(diaNascimento) > Number(dataAtual.dia))){
                    return NaN;
                };
            //mesmo ano/ mes maior
                if (anoIgual && (Number(mesNascimento) > Number(dataAtual.mes))){
                    return NaN;
                };

    return dataNascimentoCompleta;    

}
module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };