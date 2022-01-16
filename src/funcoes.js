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
function validaTextoPreenchido(texto) {
    let resultado;
    procuraEspaco(texto) === false ? resultado : procuraTexto(texto) === true ? resultado = texto.trim() : resultado; return resultado;   
    function procuraEspaco(texto) {
        let regexp = new RegExp('[\s \S]');
        let string = regexp.test(texto);     
        return string;          
    }
    function procuraTexto(texto){
        let regexp = new RegExp(/[a-z]/i);
        let string = regexp.test(texto);
        return string;
    }
 }

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(datas) {   
    
    if (verificaDia(datas) === true && verificaMes(datas) === true && verificaAno(datas)){
        let resultado = "Ok";
        return resultado;
    }else{
        let resultado = NaN;
        return resultado;
    }

    function verificaDia(dia){
        let data = dia.slice(0, 2);
        let resultadoDia;
        let string1, string2;
            for (let i = 0; i < data.length; i++){
                switch (i){
                    case 0:
                        let regexp1 = new RegExp(/[0-3]/);
                        string1 = regexp1.test(data[i]);
                        break;
                    case 1:
                        let regexp2 = new RegExp(/[0-9]/);    
                        string2 = regexp2.test(data[i]); 
                        break;                   
                }
                if (i === 1){
                    if ( string1 === true && string2 === true){
                        resultadoDia = true;
                    }else{
                        resultadoDia = false;
                    }
                    return resultadoDia;
                }
            }
    }
    function verificaMes(mes){
        let meses = mes.slice(3, 5);
        let resultadoMes;
        let string1, string2;
            for (let i = 0; i < meses.length; i++){
                switch (i){
                    case 0:
                        let regexp1 = new RegExp(/[0-1]/);
                        string1 = regexp1.test(meses[i]);
                        break;
                    case 1:
                        let regexp2 = new RegExp(/[1-9]/);    
                        string2 = regexp2.test(meses[i]); 
                        break;                   
                }
                if (i === 1){
                    if ( string1 === true && string2 === true){
                        resultadoMes = true;
                    }else{
                        resultadoMes = false;
                    }
                    return resultadoMes;
                }
            }
    }
    function verificaAno(ano){
        let anos = ano.slice(6, 10);
        let resultadoAno; 
        let string1, string2, string3, string4;       
            for (let i = 0; i < anos.length; i++){
                switch (i){
                    case 0:
                        let regexp1 = new RegExp(/[2]/);
                        string1 = regexp1.test(anos[i]);
                        break;
                    case 1:
                        let regexp2 = new RegExp(/[0-9]/);    
                        string2 = regexp2.test(anos[i]); 
                        break; 
                    case 2:
                        let regexp3 = new RegExp(/[0-9]/);    
                        string3 = regexp3.test(anos[i]); 
                        break;
                    case 3:
                        let regexp4 = new RegExp(/[0-9]/);    
                        string4 = regexp4.test(anos[i]); 
                        break;  
                }
                if (i === 3){
                    if ( string1 === true && string2 === true && string3 === true && string4 === true){
                        resultadoAno = true;
                    }else{
                        resultadoAno = false;
                    }
                    return resultadoAno;
                }
            }
    }            
 }

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };