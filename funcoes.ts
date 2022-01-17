// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
const saudar = (nome: string) => `Olá, ${nome}`;

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
const extrairPrimeiroNome = (nomeCompleto: string) => nomeCompleto.split(' ').shift();

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula
// e as outras minúsculas: tIaGo -> Tiago
const capitalizar = (palavra : string) =>
  palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
const calculaImposto = (valor: number, categoria: string) =>
  categoria !== 'Alimentação'? valor * .1 : 0;
  
// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
const calculaDesconto = (preco : number, categoria : string, cupom : string) =>
  categoria === `Alimentação` && cupom === `NULABSSA` ? (preco / 2) : preco;

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
const truncar = (palavra: string, tamanho: number = 5) =>
  palavra.length <= tamanho ? palavra : palavra.slice(0, tamanho).concat("...");

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
const validaTextoPreenchido = (texto: string) => {
  if (!texto.trim()) {
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
const validaData = (date : string) => {
  const dataSeparada = date.split("/");
  const testDate = new Date(`${dataSeparada[2]}/${dataSeparada[1]}/${dataSeparada[0]}`);
  if(Date.parse(testDate.toString())){
    return [];
  }else{
    return NaN;
  }
}
module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };