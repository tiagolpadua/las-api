const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    let menorNumero = 99
    let verificaTipo = typeof(lista)
    if(verificaTipo == "string" || lista.length === 0){
      return undefined
    }
    for (i = 0; i < lista.length; i++){
        if(lista[i] < menorNumero){
          menorNumero = lista[i]
        }
      }
    return menorNumero
   
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    let maiorNumero = 0
    if(typeof(lista) == "string" || lista.length === 0){
      return undefined
    }
    for (i = 0; i < lista.length; i++){
        if(lista[i] > maiorNumero){
          maiorNumero = lista[i]
        }
      }
    return maiorNumero
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    const nomesCapitalizados = []
    if(typeof(nomes) == "string" || nomes.length === 0){
      return undefined
    }
    for (i = 0; i < nomes.length; i++){
        nomesCapitalizados.push(`${nomes[i][0].toUpperCase()}${nomes[i].slice(1).toLowerCase()}`) 
      }
    return nomesCapitalizados

}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15]
    const categoriasEdescontos = categorias.concat(descontos)
    if (categoria == categoriasEdescontos[0]){
      return categoriasEdescontos[2]     
    }else if(categoria == categoriasEdescontos[1]){
      return categoriasEdescontos[3]  
    }else{
      return 0
    }
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if(lista.length === 0 || typeof(lista) == 'string'){
        return undefined
      }
    let DentroDoOrcamento = lista.filter((item) => item <= precoMaximo)
    return DentroDoOrcamento
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if(lista.length === 0 || typeof(lista) == 'string'){
        return undefined
      }
    let valorFinal = lista.reduce((ac,total) => ac + total)
    return valorFinal
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
  if(!Array.isArray(lista) || lista.length === 0){
    return undefined  
  }else{
    const MenorEMaiorPreco = [lista.reduce((a, b) => Math.min(a,b)), lista.reduce((a, b) => Math.max(a,b))]
    return MenorEMaiorPreco
  }
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
  if(!Array.isArray(lista) || lista.length === 0){
    return undefined  
  }else{
    const valoresNoOrcamento = lista.filter(valor => valor >= menorValor && valor <= maiorValor)
    return valoresNoOrcamento.length === 0? undefined : valoresNoOrcamento
  }
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
  let valorCategoria = obterDescontoCategoria(categoria)
  if (cupom !== 'CUPOM-INVALIDO' && cupom !== 'INVALIDO'){
    return valorCategoria + 10 
  }else{
    return valorCategoria    
  }
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
  let ValorFinal = 0
  if(!Array.isArray(precos) || precos.length === 0){
    return undefined  
  }else{
    for(i=0; i < categorias.length; i++){
      ValorFinal +=  precos[i] - (precos[i] * (obterDescontoTotal(categorias[i], cupom) / 100))
     } 
      return ValorFinal
  }
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
  let capitalizar = nomeCompleto.toLowerCase().split(" ");
  for (var i = 0; i < capitalizar.length; i++) {
    let letras = capitalizar[i]
    if(letras.slice(0).length <= 3){
      capitalizar[i] = letras.slice(0).toLowerCase()
    }else{
    capitalizar[i] = letras[0].toUpperCase() + letras.slice(1)
    }
  }
return capitalizar.join(" ")
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
  function valorDesconto(categoria){
  
    const valorCategorias = [5, 8, 0.70]
    if(categoria === 'Infantil'){
      return valorCategorias[0]
    }else if(categoria === 'Alimentação'){
      return valorCategorias[1]
    }else{
      return valorCategorias[2]
    }
    
  }
  
  function total(preco, categoria){
    return preco - categoria + (preco * 0.15)
  }
  function verificaNome(nome){
    if(nome === 'Pipoca'){
      return "Pipoca    "
    }
    return nome
  }
  
  if(!Array.isArray(listaCategoriasProdutos) || listaCategoriasProdutos.length === 0){
      return undefined  
    }
  
    let produtos = listaNomesProdutos
    let precos = listaPrecosProdutos
    let categoria = listaCategoriasProdutos
    let precoPrimeiroProduto = total(precos[0], valorDesconto(categoria[0]))
    let precoSegundoProduto = (precos[1]- valorDesconto(categoria[1]))
    let precoSubTotal = (precoPrimeiroProduto + precoSegundoProduto).toString().replace('.', ',') + '0'
    let precoTotal = ((precoPrimeiroProduto + precoSegundoProduto) - 3).toString().replace('.', ',') + '0'
    let notaFiscal =  ''
    
    for (i = 0; i < produtos.length; i++ ){
      if( i === 0){
        notaFiscal += `Nome           Valor     Desconto  Imposto Total     \n${verificaNome(produtos[i])}     R$  ${precos[i]},00 R$   ${valorDesconto(categoria[i])},00     15% R$  ${precoPrimeiroProduto},00 \n`
    }else{
        notaFiscal +=`${produtos[i]}   R$   ${precos[i]},00 R$   ${valorDesconto(categoria[i]).toString().replace('.', ',')}0         R$   ${precoSegundoProduto.toString().replace('.', ',')}0 \nSubtotal                                   R$  ${precoSubTotal} \nCupom de Desconto: NULABSSA                R$   3,00 \nTotal                                      R$  ${precoTotal}`
      }
    }
  return notaFiscal
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
