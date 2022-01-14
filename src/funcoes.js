// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) { 
    return `Olá, ${nome}`
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nomeCompleto) {
    let indiceEspaco = nomeCompleto.search(" ")
    let primeiroNome = nomeCompleto.slice(0, indiceEspaco)
    return primeiroNome
 }

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavra) { 
    let primeiraLetra = palavra.toUpperCase()
    primeiraLetra = primeiraLetra.slice(0, 1)
    
    let demaisLetras = palavra.toLowerCase()
    demaisLetras = demaisLetras.slice(1, palavra.length)
    return primeiraLetra+demaisLetras
  }

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(preco, categoria) {
    let impostoCalculado;
    if (categoria === "Alimentação") {
      impostoCalculado = 0
    } else {
      impostoCalculado = (preco * 0.1)
    }
    return impostoCalculado
   
 }

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preco, categoria, cupom) {
  let temDesconto = (categoria === "Alimentação" && cupom === "NULABSSA")
  let precoComDesconto;
  if (temDesconto){
    precoComDesconto = (preco/2)
  } else {
    precoComDesconto = preco
  }
  return precoComDesconto
 }

// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(palavra, comprimento = 5) {
  let palavraTruncada;

  if (palavra.length > comprimento){
    palavraTruncada = palavra.slice(0,comprimento)
    return palavraTruncada+"..."
  } else {
    return palavra
  }
 }

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) { 
  let semEspacos = texto.trim()
  if (semEspacos === ""){
    return 
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

  date = new Date(data);
  let dia = data.slice(0,2)
  let mês = data.slice(3,5)
  let ano = data.slice(6,10)
  let dataFormatada = `${ano}/${mês}/${dia}`
  let isValidDate = Date.parse(dataFormatada)

    if (isNaN(isValidDate)) {
      return isValidDate
    } else {
      return "Ok"
    }
   }

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };