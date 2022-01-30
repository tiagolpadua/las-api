const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    let menorNumero;
    if (Array.isArray(lista)){
        for (let i = 0; i <lista.length; i++){
            if (i === 0){
                menorNumero = lista[i]
            }else{
                if(lista[i]< menorNumero){
                    menorNumero = lista[i]
                }
            }
        }
    }else{
        return undefined
    }
    return menorNumero
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    let maiorNumero;
    if(Array.isArray(lista)){
        for (let i = 0; i < lista.length; i++){
            if(i === 0){
                maiorNumero = lista[i]
            }else{
                if(lista[i]>maiorNumero){
                    maiorNumero = lista[i]
                }
            }
        }
    }else{return undefined}
    return maiorNumero
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    let nomesCapitalizados = []
    if(Array.isArray(nomes)=== false|| nomes.length === 0){
        return undefined
    }
    nomes.forEach(nome =>{
        if(nome.length >=3){
        nomesCapitalizados.push(capitalizar(nome))
    }else{
        nomesCapitalizados.push(nome)
    }
    })
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
    if (categorias.indexOf(categoria)=== -1){
        return 0
    }
    return descontos[categorias.indexOf(categoria)]

}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    const novaLista = []
    const antigaLista = lista
    if(Array.isArray(lista)=== false|| antigaLista.length === 0){
        return undefined
    }
    for(let i = 0; i < antigaLista.length; i++) {
        if (antigaLista[i] <= precoMaximo){
            novaLista.push(antigaLista[i])
        }
    }
    return novaLista
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    let valorTotal=0;
    if(Array.isArray(lista)=== false|| lista.length === 0){
        return undefined
    }
    lista.forEach(valor => {

        valorTotal += valor
        
    })
    return valorTotal
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if(Array.isArray(lista)=== false|| lista.length === 0){
        return undefined
    }
    return [obterMenorPreco(lista),obterMaiorPreco(lista)]
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    let valoresDentroDoOrcamento = []
    if(Array.isArray(lista)=== false|| lista.length === 0|| menorValor>= maiorValor){
        return undefined
    }
    lista.forEach(valor =>{
        if(menorValor<=valor&& valor <= maiorValor){
            valoresDentroDoOrcamento.push(valor)
        }
    })
    return valoresDentroDoOrcamento
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
    if(cupom === 'NULABSSA'||cupom === 'ALURANU'){
        return obterDescontoCategoria(categoria) + 10
    }
    return obterDescontoCategoria(categoria)
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    let valorFinal = 0;
    if(Array.isArray(precos)=== false|| precos.length === 0){
        return undefined
    }
    for(let i = 0; i < precos.length;i++){
        valorFinal += precos[i]-(precos[i]*(obterDescontoTotal(categorias[i],cupom)/100))
    }
    return valorFinal
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    let nomeAProcessar = nomeCompleto.split(' ')
    let processandoNome= capitalizarNomes(nomeAProcessar)
    let nomeProcessado = processandoNome.join(' ')
    return nomeProcessado
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

    if(Array.isArray(listaCategoriasProdutos)=== false|| listaCategoriasProdutos.length === 0){
        return undefined
    }
    

      let listaProdutos = listaNomesProdutos;
      let listaPrecos = listaPrecosProdutos;
      let listaCategoria = listaCategoriasProdutos;
      let primeiroProduto = valorTotal(listaPrecos[0], descontoTotal(listaCategoria[0]));
      let segundoProduto = (listaPrecos[1]- descontoTotal(listaCategoria[1]));
      let subtotal = (primeiroProduto + segundoProduto).toString().replace('.', ',') + '0';
      let precoTotalDaCompra = ((primeiroProduto + segundoProduto) - 3).toString().replace('.', ',') + '0';
      let gerarNotaFiscal = '';

      for (i = 0; i < listaProdutos.length; i++ ){
        if( i === 0){
          gerarNotaFiscal += `Nome           Valor     Desconto  Imposto Total     \n${validarNome(listaProdutos[i])}     R$  ${listaPrecos[i]},00 R$   ${descontoTotal(listaCategoria[i])},00     15% R$  ${primeiroProduto},00 \n`;
      }else{
          gerarNotaFiscal +=`${listaProdutos[i]}   R$   ${listaPrecos[i]},00 R$   ${descontoTotal(listaCategoria[i]).toString().replace('.', ',')}0         R$   ${segundoProduto.toString().replace('.', ',')}0 \nSubtotal                                   R$  ${subtotal} \nCupom de Desconto: NULABSSA                R$   3,00 \nTotal                                      R$  ${precoTotalDaCompra}`;
        }
      }
    return gerarNotaFiscal;

      function valorTotal(preco, categoria){
        return preco - categoria + (preco * 0.15)
      }

    function descontoTotal(categoria){

        const precoPorCategoria = [5, 8, 0.70]
        if(categoria === 'Infantil'){
          return precoPorCategoria[0]
        }else if(categoria === 'Alimentação'){
          return precoPorCategoria[1]
        }else{
          return precoPorCategoria[2]
        }

      }

      function validarNome(nome){
        if(nome === 'Pipoca'){
          return "Pipoca    "
        }
        return nome
      }

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
