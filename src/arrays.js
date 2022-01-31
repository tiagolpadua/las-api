const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
   let menor = lista[0];
  
   if(Array.isArray(lista)  && lista.length > 0 ){
      for(let i=0; i< lista.length; i++){
        if(lista[i] < menor){
            menor = lista[i];
        }
      }
      return menor;
    }
    return undefined;
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
  
  if(Array.isArray(lista)  && lista.length > 0 ){
   let maior = Math.max(...lista)
   return maior;
  }
  return undefined;
  
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {

  if(Array.isArray(nomes) && nomes.length > 0){
    const nomesCapitalizados = nomes.map(nome => nome[0].toUpperCase() + nome.slice(1).toLowerCase());
    return nomesCapitalizados;
  }
  return undefined;
   
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15];

    let indexDesconto = categorias.indexOf(categoria);

    if(indexDesconto !== -1){
      return descontos[indexDesconto];
    }
    return 0;
  
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
  
  if(Array.isArray(lista) && lista.length>0){
    let filtro = lista.filter(valor => valor <= precoMaximo)
    return filtro;
  }
  return undefined;
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
  let totalCompra = 0;

  if(Array.isArray(lista) && lista.length > 0){
    lista.forEach(total => {
      totalCompra += total;
    })
    return totalCompra;
  }
  return undefined;
  
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {

  let arrayPrecos = [];
  if(Array.isArray(lista) && lista.length>0){
    let maior = Math.max(...lista);
    let menor = Math.min(...lista)
    
    arrayPrecos.push(menor);
    arrayPrecos.push(maior);

    return arrayPrecos;
  }
  return undefined;
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
  
  if(Array.isArray(lista) && lista.length > 0 && menorValor <= maiorValor){
    let precosOrcamento = [];

    for(let i=0; i<lista.length; i++){

      if(lista[i] >= menorValor && lista[i] <= maiorValor){
        precosOrcamento.push(lista[i]);
      }

    }
    return precosOrcamento;
  }
  return undefined;

}

// Crie uma função que recebe uma categoria e um cupom e aplica um acréscimo de 10% no desconto da categoria, se o cupom for válido
// Utilize a função obterDescontoCategoria
// ('Alimentação', 'NULABSSA') => 40
// ('Alimentação', 'ALURANU') => 40
// ('Infantil', 'ALURANU') => 25
// ('Bebida', 'ALURANU') => 10
// ('Bebida', 'CUPOM-INVALIDO') => 0
// ('Alimentação', 'CUPOM-INVALIDO') => 30
// Utilize a função descontoCategoria criada anteriormente
function obterDescontoTotal(categoria, cupom) {

  if(cupom === 'NULABSSA' || cupom === 'ALURANU'){
    return obterDescontoCategoria(categoria) + 10;
  }
  return obterDescontoCategoria(categoria);
  
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
  let descontoFinal = 0;

  if(Array.isArray(precos) && precos.length>0){
    let descontos = precos.map((preco,index) => preco - (preco * obterDescontoTotal(categorias[index],cupom))/100)
    
    descontos.forEach(total =>{
      descontoFinal += total;
    })

    return descontoFinal;
  }
  return undefined;
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
  
  
  let seguraNome = nomeCompleto.split(" ")
  
  let seguraNome1 = seguraNome.map(nome => {
    if(nome.length >=3){
      return nome[0].toUpperCase() + nome.slice(1);
    }
    return nome;
  });
  return seguraNome1.join(" ");
}

// =======
// Desafio
// =======

// Crie uma função que recebe uma lista de preços e categorias e devolve um cupom fiscal conforme abaixo:
// (['Serpentina', 'Refrigerante'], [20, 7], ['Infantil', 'Bebida'], 'NULABSSA') => 
// Nome           Valor     Desconto  Imposto Total     
// Serpentina     R$  20,00 R$   5,00     15% R$  18,00 
// Refrigerante   R$   7,00 R$   0,70         R$   6,30 
// Subtotal                                   R$  24,30 
// Cupom de Desconto: NULABSSA                R$   3,00 
// Total                                      R$  21,30
function gerarCupomFiscal(listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos, cupom) {

}

module.exports = {
    obterMenorPreco,
    obterMaiorPreco,
    capitalizarNomes,
    obterDescontoCategoria,
    obterPrecosLimitadosAoOrcamento,
    calcularTotalDaCompra,
    obterMenorEMaiorPrecos,
    obterPrecosDentroDoOrcamento,
    obterDescontoTotal,
    calcularTotalDaCompraComDescontos,
    capitalizarNomeCompleto,
    gerarCupomFiscal
};
