// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) { 
    return `Olá, ${nome}`;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nomeCompleto) {
    let selecionaPrimeiroNome = nomeCompleto.split(" ", 1);
    let primeiroNome = selecionaPrimeiroNome.toString();

	    return primeiroNome;
    }

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavra) { 
	let diminuirLetrasPalavra = palavra.toLowerCase();
	let nomeCapitalizado = diminuirLetrasPalavra.replace(/^\w/, (c) => c.toUpperCase());

	return nomeCapitalizado;
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(preço, produto) {

	if (produto === "Bebida") {
		return preço * 0.1;
	} else {
		return 0;
	}
}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preço, produto, cupom) { 
	if (produto === "Alimentação" && cupom === "NULABSSA") {
		desconto = preço * 0.5;
		preçoComDesconto = preço - desconto;
		return preçoComDesconto
	} else {
		return preço
	}
}

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(palavra, comprimentoMaximo) {
	const comprimentoDefault = 5;

	if (comprimentoMaximo === 0 || undefined || NaN) {
		comprimentoMaximo = comprimentoDefault; 
		} if (palavra.length > comprimentoMaximo) {
   			return palavra.slice(0, comprimentoMaximo) + "...";
  		} else if (palavra.length < comprimentoMaximo) {
  			return palavra;
  		} else {
   			return palavra.slice(0, comprimentoDefault) + "...";
  		}
 	}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) { 
	if (texto === "" || texto === "    "){
		return undefined
	} else {
	 return texto.trim() 
	}
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(data) {
	let dataString = String(data);
	let dataArray = dataString.split("/"); 

    let dia = Number(dataArray [0]); 
    let mes = Number(dataArray [1]);
    let ano = Number(dataArray [2]);

    if ((ano > 0 && ano < 2023) && (mes >= 1 && mes <= 12) && (dia > 0 && dia < 31)) {

	    switch(mes){
	     case 1: case 3: case 5: case 7: 
	     case 8: case 10: case 12:
	      if(dia <= 31)
	       return "Ok"; // Data válida
	      else
	       return "NaN"; // Inválido (mes com mais de 31 dias)
	      break ;
	     case 4: case 6:
	     case 9: case 11:
	      if(dia <= 30)
	       return "Ok"; // Data válida
	      else
	       return "NaN"; // Inválido (mes com mais de 30 dias)
	      break ;
	     case 2:
	      if( (ano%400 == 0) || (ano%4==0 && ano%100!=0) )
	       if( dia <= 29)
	        return "Ok"; //Data válida
	       else
	        return "NaN"; //Inválido (mes com mais de 29 dias)
	      else
	       if( dia <= 28)
	        return "Ok"; // Data válida
	       else
	        return "NaN"; //Inválido (mes com mais de 28 dias)
	    }
   } else {
  	return "NaN"; // mês abaixo de 1 e acima de 12 // ano abaixo de 0 e acima de 2022
  } 
 }

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };