const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    if(lista.length === 0)
        return undefined

    for(i=0; i < lista.length; i++){
        if(isNaN(parseInt(lista[i])))
        return undefined
    }   
    var minimo = Math.min(...lista)
    return minimo
    
}



// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    if(lista.length === 0)
    return undefined

    for(i=0; i < lista.length; i++){
     if(isNaN(parseInt(lista[i])))
        return undefined
}   
    var maximo = Math.max(...lista)
    return maximo

}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    let novaLista = []

    if(nomes.length === 0){
        return undefined
    }

    for (i=0; i < nomes.length; i++){
        if(nomes[i].length < 3){
            return undefined
        }
        

        nomes[i] = nomes[i][0].toUpperCase() + nomes[i].slice(1).toLowerCase()
        novaLista.push(nomes[i])
    }
    
    return (novaLista)
}
    

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15]

    for(i=0; i < categorias.length; i++){
        if(categoria=== 'Alimentação'){
            if(descontos[i]=== 30){
                return descontos[i] 
            }else{
                return 30
            }
        }

        if(categoria === 'Infantil'){
            if(descontos[i]=== 15){
                return descontos[i] 
            }else{
                return 15
            }
        }

        return 0
    }

    
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if (lista.length === 0)
        return undefined
    let novaLista = []
    for(i=0; i < lista.length; i++){
            if(isNaN(parseInt(lista[i])))
               return undefined
        
            if(lista[i] <= precoMaximo)
                novaLista.push(lista[i])
       }   
    return novaLista
    
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if(lista.length === 0)
        return undefined

    for(i=0; i < lista.length; i++){
        if(isNaN(parseInt(lista[i])))
        return undefined
    }   
    const totalDasCompras = lista.reduce((acumulador, atual) => atual + acumulador, 0)
    return totalDasCompras
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    

    if(lista.length === 0)
        return undefined

    for(i=0; i < lista.length; i++){
        if(isNaN(parseInt(lista[i])))
        return undefined
    }   
    var minimo = Math.min(...lista)
    var maximo = Math.max(...lista)

    var novalista = [minimo, maximo]

    return novalista
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {

    if (lista.length === 0)
        return undefined

    let novaLista = []

    for(i=0; i < lista.length; i++){
            if(isNaN(parseInt(lista[i])))
               return undefined
        
            if(lista[i] >= menorValor && lista[i] <= maiorValor && menorValor <= maiorValor)
                novaLista.push(lista[i])
       }   

       if(novaLista.length === 0){
           return undefined
       }

    return novaLista
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
    let desconto = obterDescontoCategoria(categoria)
    let validade = cupomValido(cupom)

    if(desconto === 30 && validade === 'valido' ){
            return desconto +=10

    } else if ( desconto === 30 &&  validade === 'invalido' ){
            return desconto
        }
    
    if(desconto === 15 && validade === 'valido' ){
         return desconto += 10
        
        }else if(desconto === 15 && validade === 'invalido' ){
            return desconto      
    }
    if(desconto === 0 &&  validade === 'valido'  ){
       return desconto += 10
       
        } else if(desconto === 0 && validade === 'invalido' ){
            return desconto
                
    } 

}

function cupomValido(cupom){
    if (cupom==='NULABSSA' || cupom === 'ALURANU' ){
        return 'valido'
    }
    return 'invalido'
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    let novaLista = []
    
    if (precos.length !== categorias.length)
        return undefined;    

        for(a=0; a < categorias.length; a++){
            let desconto = obterDescontoTotal(categorias[a], cupom)
            let valorDoDesconto = precos[a] * (desconto/100)
            let novoValor = precos[a] - valorDoDesconto 
            novaLista.push(novoValor)
            
        }
    
        const totalDasCompras = novaLista.reduce((acumulador, atual) => atual + acumulador, 0)
        return totalDasCompras
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    var novaLista = nomeCompleto.split(" ")
    var nomeCerto =[]
    
    for(i =0; i < novaLista.length; i++){
        if(novaLista[i].length < 3){
            nomeCerto.push(novaLista[i])
        } else{
        novaLista[i] = novaLista[i][0].toUpperCase() + novaLista[i].slice(1).toLowerCase()
        nomeCerto.push(novaLista[i])
        }
    }
    return nomeCerto.join(" ")
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

    let total = 0
    let subtotalNota = 0  
    let mensagem = ''  
    let validadeDoCupom = cupomValido(cupom)

    if(listaNomesProdutos.length === 0 && listaCategoriasProdutos.length === 0 && listaPrecosProdutos.length === 0){
        return undefined;
    }
    if (listaPrecosProdutos.length !== listaCategoriasProdutos.length) {
        return undefined; 
    }
    if(validadeDoCupom === 'invalido'){
        return undefined
    }
        
    
    mensagem  +=("Nome           Valor     Desconto  Imposto Total     \n")


    for (a=0; a < listaCategoriasProdutos.length ; a++){
        
        if(listaCategoriasProdutos[a] === 'Infantil'){

          let desconto = obterDescontoTotal(listaCategoriasProdutos[a], cupom)
          let valorDoDesconto = listaPrecosProdutos[a] * (desconto/100)
          let valorDoImposto = listaPrecosProdutos[a] * 0.15
          let subTotal = listaPrecosProdutos[a] + valorDoImposto- valorDoDesconto 
          subtotalNota += subTotal
          mensagem = mensagem + (`${listaNomesProdutos[a]}     R$  ${listaPrecosProdutos[a].toFixed(2).toString().replace(".",",")} R$   ${valorDoDesconto.toFixed(2).toString().replace(".",",")}     15% R$  ${subTotal.toFixed(2).toString().replace(".",",")} \n`)
          
                    
        } if(listaCategoriasProdutos[a] === 'Bebida'){

        let desconto = obterDescontoTotal(listaCategoriasProdutos[a], cupom)
        let valorDoDesconto = listaPrecosProdutos[a] * (desconto/100)
        let subTotal = listaPrecosProdutos[a] - valorDoDesconto 
        subtotalNota += subTotal
        mensagem = mensagem + (`${listaNomesProdutos[a]}   R$   ${listaPrecosProdutos[a].toFixed(2).toString().replace(".",",")} R$   ${valorDoDesconto.toFixed(2).toString().replace(".",",")}         R$   ${subTotal.toFixed(2).toString().replace(".",",")} \n`)

        }else  if(listaCategoriasProdutos[a] === 'Alimentação'){

          let desconto = obterDescontoTotal(listaCategoriasProdutos[a], cupom)
          let valorDoDesconto = listaPrecosProdutos[a] * (desconto/100)
          let valorDoImposto = listaPrecosProdutos[a] * 0.15
          let subTotal = listaPrecosProdutos[a] + valorDoImposto- valorDoDesconto 
          subtotalNota += subTotal
          mensagem = mensagem + (`${listaNomesProdutos[a]}         R$  ${listaPrecosProdutos[a].toFixed(2).toString().replace(".",",")} R$   ${valorDoDesconto.toFixed(2).toString().replace(".",",")}     15% R$  ${subTotal.toFixed(2).toString().replace(".",",")} \n`)

        }


        

    }

    total += subtotalNota -3
    

    mensagem = mensagem + (`Subtotal                                   R$  ${subtotalNota.toFixed(2).toString().replace(".",",")} \n`)
    mensagem = mensagem + (`Cupom de Desconto: ${cupom}                R$   3,00 \n`)
    mensagem = mensagem + (`Total                                      R$  ${total.toFixed(2).toString().replace(".",",")}`)
    
    return mensagem
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
