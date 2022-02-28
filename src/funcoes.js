// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome:
// Tiago -> Olá, Tiago
function saudar(nome) {
  return `Olá, ${nome}`;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome:
// Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nome) {
  return `${nome.split(" ")[0]}`;
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(nome) {
  return `${nome[0].toUpperCase() + nome.slice(1).toLowerCase()}`;
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto.
// Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(valor, categoria) {
  if (categoria === "Alimentação") {
    return 0;
  } else {
    return valor * 0.1;
  }
}

// Escreva uma função que recebe um preço original, uma categoria de produto
// e um cupom de desconto e calcula o preço com desconto.
//  Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(valor, categoria, cupom) {
  if (categoria === "Alimentação" && cupom === "NULABSSA") {
    return valor * 0.5;
  } else {
    return valor;
  }
}

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(texto, comprimento = 5) {
  if (texto.length > comprimento) {
    return `${texto.slice(0, comprimento) + "..."}`;
  } else {
    return `${texto.slice(0, 6)}`;
  }
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) {
  if (texto.trim() === "") {
    return undefined;
  } else {
    return texto.trim();
  }
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(dataDeNascimento) {
  let dia = dataDeNascimento.split("/")[0];
  let mes = dataDeNascimento.split("/")[1];
  let ano = dataDeNascimento.split("/")[2];
  let dataCorreta = `${mes + "/" + dia + "/" + ano}`;
  if (Date.parse(dataCorreta)) {
    return "Ok";
  } else {
    return Date.parse(dataCorreta);
  }
}

module.exports = {
  saudar,
  extrairPrimeiroNome,
  capitalizar,
  calculaImposto,
  calculaDesconto,
  truncar,
  validaTextoPreenchido,
  validaData,
};
