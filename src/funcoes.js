// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome){
  return `Olá, ${nome}`;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nomeCompleto){
 return nomeCompleto.split(" ")[0]; 
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar (palavra){
 return palavra[0].toUpperCase() + (palavra.substr(1)).toLowerCase(); 
}
    
// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(preco,categoria){
  const valorImposto = preco/10
  if (categoria === "Alimentação"){
    return 0
  }else{
    return valorImposto;
  }
}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(valorDoProduto,categoria,cupom){  
  if((categoria === "Alimentação") && (cupom === "NULABSSA")){
    return valorDoProduto /= 2;
  } else{
     return valorDoProduto;
  }
}

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar (palavra,comprimentoMax = 5){
  const palavraTruncada = palavra.substr(0,comprimentoMax)
  if(palavra.length > comprimentoMax){
   return palavraTruncada + "...";
  }else{
    return palavraTruncada;
  } 
 }

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto){
    const textoPreenchido = texto.trim();
    if(textoPreenchido !== ("")){
     return textoPreenchido;
    }
  }  
// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN

function validaData(dataInformada){
  const dataParaValidar = dataInformada.split("/");
  const diaParaValidar = dataParaValidar[0];
  const mesParaValidar = dataParaValidar[1];
  const anoParaValidar = dataParaValidar[2];
  
  const mesesCom31=["01","03","05","07","08","10","12"];
  const mesesCom30=["04","06","09","11"];
  
  const dataVerificada = new Date(anoParaValidar, mesParaValidar-1, diaParaValidar );
  
  function igualOuAnteriorDataHj(dia, mes, ano){
     dataHoje = new Date();
     anoHoje = dataHoje.getFullYear();
     mesHoje = dataHoje.getMonth();
     diaHoje = dataHoje.getDate();
  
     if(ano < anoHoje){
       return true;
     }
     else if(mes < (mesHoje+1) && ano <= anoHoje){
       return true;
     }
      else if((dia <= diaHoje) && (mes<=mesHoje+1) && (ano <=anoHoje)){
        return true;
     }
      else{
        return false;
     } 
  }
  function ultimoDiaDoMes(mes,ano){
    for(let i=0;i<mesesCom31.length;i++){
      if(mes === mesesCom31[i]){
        return 31;
      }
       if(mes === mesesCom30[i]){
        return 30;
      }
       if(mes === 2 && ((ano%4) === 0)){
        return 29;
      }
       if(mes === 2 ){
        return 28;
      }
    }
  }
  
  if((diaParaValidar <= ultimoDiaDoMes(mesParaValidar,anoParaValidar)) && (diaParaValidar > 0) && (mesParaValidar > 0)
  && (mesParaValidar <= 12) && (igualOuAnteriorDataHj(diaParaValidar,mesParaValidar,anoParaValidar))){
   return dataVerificada
   }
  else{
   return NaN;
   }
  }
  
    
module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };