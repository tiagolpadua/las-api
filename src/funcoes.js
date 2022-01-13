// =========
// Essencial
// =========

// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
function saudar(nome) {
    return "Olá, " + nome;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
function extrairPrimeiroNome(nomeCompleto) {
    i = 0;
    for (var i = 0;nomeCompleto[i]!=" "; i=i+1);
    var limiteDoPrimeiroNome = i;
    return nomeCompleto.substring(0, limiteDoPrimeiroNome);
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
function capitalizar(palavraDoUsuario) { 
    var mudarTudoParaMinusculo = palavraDoUsuario.toLowerCase();
    var mudarPrimeiraLetraParaMaiuscula = palavraDoUsuario.substring(0, 1).toUpperCase();
   return mudarPrimeiraLetraParaMaiuscula + mudarTudoParaMinusculo.substring(1);
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(preco, categoria) {
    if (categoria == "Alimentação"){
        return preco*0
      } else {
        return preco * (10/100)
      }
}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preco, categoria,cupom) { 
    if (categoria=="Alimentação" & cupom =="NULABSSA"){
    return preco-(preco*(50/100))
    }else{
    return preco
  }
} 
// =========
// Desejável
// =========

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
function truncar(primeiraPalavra, comprimentoMaximo=5) {
  if(primeiraPalavra.length> comprimentoMaximo){
  return primeiraPalavra.substring(0,comprimentoMaximo)+"..."
}else if(primeiraPalavra.length<comprimentoMaximo){
  return primeiraPalavra

}else{
  return primeiraPalavra.substring(0,5)
}
}
// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
function validaTextoPreenchido(texto) { 
  if (texto.trim()==""){
    return undefined;
  }else{
    return texto.trim();
  }
}

// =======
// Desafio
// =======

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date se a data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
function validaData(data) { 
    var dia = data.substring(0,2)
    var mes = data.substring(3,5)
    var ano = data.substring(6,10)
    if (dia<31 & mes<12 & ano < 2022){
      return Date(data)
    }else{
      return NaN
    }
}

module.exports = { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData };