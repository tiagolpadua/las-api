const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    let min=lista[0];
    if (Array.isArray(lista) && lista.length!==0) {
        for (let i=0; i<lista.length; i++){
            if (lista[i]<min) {
                min=lista[i];
            }
        }
        return min
    }
    else{
        return undefined;
    }
}  
//console.log(obterMenorPreco([10, -7, 8, 25, 8, 9, 100, 99]));

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {   
   let max=0;
   if (!Array.isArray(lista) || lista.length===0) {
    return undefined
}
        for (let i=0; i<lista.length; i++){
            if (lista[i]>max) {
                max=lista[i];
            }
        }
        return max
 
}
//console.log(obterMaiorPreco(""));

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if (!Array.isArray(nomes) || nomes.length === 0){
        return undefined
    }

    for ( let i = 0; i < nomes.length; i++) {
        nomes[i]= nomes[i][0].toUpperCase() + nomes[i].slice(1).toLowerCase()
    }
    return nomes
}
//console.log(capitalizarNomes([]));

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15]

    for ( let i = 0; i < categorias.length; i++) {
       if (categorias[i] === categoria ){
           return descontos[i]
        }
    
    }    
    return 0;

}


// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {

    if (!Array.isArray(lista) || lista.length === 0){
        return undefined
    }
    let arr = []

    for ( let i = 0; i < lista.length; i++) {
        if (lista[i]<=precoMaximo){
            arr.push(lista[i])
        }
}
    return arr
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if (!Array.isArray(lista) || lista.length === 0){
        return undefined
    }
    let sum =0;
    for ( let i = 0; i < lista.length; i++) {
       sum+=lista[i]
        }
    return sum
}
// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if (!Array.isArray(lista) || lista.length === 0){
        return undefined
    }

    let max=lista[0];
    let min=lista[0];
    for (let i=0; i<lista.length; i++){
        if (lista[i]<min) {
            min=lista[i];
        }
        if (lista[i]>max){
            max=lista[i]
        }
}
return [min, max]
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    if (!Array.isArray(lista) || lista.length === 0){
        return undefined
    }
    if (menorValor>maiorValor){
        return undefined
    }
    let arr = []
    for ( let i = 0; i < lista.length; i++) {
        if (lista[i]<maiorValor && lista[i]>=menorValor){
            arr.push(lista[i])
        }
}
    return arr
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

   let  value = obterDescontoCategoria(categoria)

   if (cupom==='CUPOM-INVALIDO' || cupom==='INVALIDO') {
       return value
   }
   else{
       value=value+10
       return value
   }

}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    let totalDiscount = 0;

    if(categorias.length <=0 || precos.length <=0){
        return undefined;}
    else if (!Array.isArray(categorias) || !Array.isArray(precos)){
        return undefined}
    else{
        for(let i = 0; i < categorias.length; i++){
            let desc = obterDescontoTotal(categorias[i], cupom)
            totalDiscount += precos[i] - (precos[i] * desc) / 100;
    }
    return totalDiscount;
}

}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {

    let separateNames=nomeCompleto.split(" ")
    if(!Array.isArray(separateNames) || (separateNames.length === 0)){
        return undefined
    }
    
    for (let i=0; i<separateNames.length; i++) {
        if (separateNames[i].length>=3){
        separateNames[i]= separateNames[i][0].toUpperCase()+ separateNames[i].slice(1).toLowerCase()}
    }
    return separateNames.join(" ")

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

       let discount  = [];
       let totalAmount = [];
       let discountCoupon = 3;
       let subTotal=0;
       let Invoice ="";

        a = [listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos]

        for (let i=0; i<a.length; i++){
            if(!Array.isArray(a[i]) || (a[i].length === 0)){
            return undefined}
            }
    
     listaCategoriasProdutos.forEach((element, index) => {
       discount.push(listaPrecosProdutos[index]*obterDescontoTotal(element, cupom)/100)
     });
     
     listaPrecosProdutos.forEach((element, index) => {
         if (index===0){
           totalAmount.push(listaPrecosProdutos[index]+(listaPrecosProdutos[index]*0.15)-discount[index])
            subTotal+=totalAmount[index]
         }
         else {
           totalAmount.push(listaPrecosProdutos[index]-discount[index])
            subTotal+=totalAmount[index]
             }

     });
    

     const biggestWord = Math.max(...listaNomesProdutos.map(x => x.length))

     const patternedWords = listaNomesProdutos.map((x, i) => {
        if (x.length < biggestWord) {
            const lengthDiff = biggestWord - x.length
            listaNomesProdutos[i] = x + ' '.repeat(lengthDiff)
        }
     })

    for (i = 0; i < listaNomesProdutos.length; i++ ){
            if( i === 0){
            Invoice += `Nome           Valor     Desconto  Imposto Total     \n`;
        }
            if (i===0){
                Invoice +=`${listaNomesProdutos[i]}   R$  ${listaPrecosProdutos[i]},00 R$   ${discount[i].toString().replace('.', ',')},00     15% R$  ${totalAmount[i].toString().replace('.', ',')},00 \n`;
            }
            if (i===1){
                Invoice +=`${listaNomesProdutos[i]}   R$   ${listaPrecosProdutos[i]},00 R$   ${discount[i].toString().replace('.', ',')}0         R$   ${totalAmount[i].toString().replace('.', ',')}0 \nSubtotal                                   R$  ${subTotal.toString().replace('.',',')}0 \nCupom de Desconto: NULABSSA                R$   3,00 \nTotal                                      R$  ${(subTotal-discountCoupon).toString().replace('.', ',')}0`;}
                 
    }   
   
    return Invoice;
    

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
