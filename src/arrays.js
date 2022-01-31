const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {

     if(Array.isArray(lista) && lista.length !== 0){

        let menorPreco = Math.min(...lista)
            return menorPreco;
    
      } else {
    
            return undefined;
     }
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    if(Array.isArray(lista) && lista.length !== 0){
    
        let maiorPreco = Math.max(...lista) 
            return maiorPreco;
        
      } else {
        
        return undefined;
     }
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if(Array.isArray(nomes) && nomes.length !== 0){
    
        for( i = 0; i < nomes.length; i++ ){
            let nome =  nomes[i][0].toUpperCase() + nomes[i].slice(1).toLowerCase()
             nomes[i] = nome
        }
        return nomes
    }else{
        return undefined
    }

}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15];
    
    if (categoria === categorias[0]) {
        return descontos[0];
    } else if(categoria === categorias[1]){
        return descontos[1];
    } else {
        return 0;
    }

}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if(Array.isArray(lista) && lista.length !== 0){
    
        function buscarNumerosAteOrcamento (valor) {
            if (valor <= precoMaximo)
                return valor;
            
    }
        let precosLimitadosAoOrcamento = lista.filter(buscarNumerosAteOrcamento);

    return precosLimitadosAoOrcamento;
    
    } else {

    return undefined;
}


}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {

    if(Array.isArray(lista) && lista.length !== 0){
    
         let total = 0;
    
        for (let i = 0; i < lista.length; i++){
            total += lista[i];
        }
    
            return total;
    
    } else {
    
        return undefined;
    
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {

    if(Array.isArray(lista) && lista.length !== 0){
    
        let menorPreco = Math.min(...lista);
        let maiorPreco = Math.max(...lista);
        let menorEMaior = [menorPreco, maiorPreco];
    
        return menorEMaior;
    
    }else{
    
        return undefined;
    }

}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    
    if(menorValor>maiorValor){
        return undefined;
    }
    
    function buscarNumerosDentroOrcamento (valor) {
        if (valor >= menorValor && valor <= maiorValor) 
        return valor;
    }
    if(Array.isArray(lista) && lista.length !== 0){
    
        let precosDentroDoOrcamento = lista.filter(buscarNumerosDentroOrcamento);
        return precosDentroDoOrcamento;

    } else {
    
        return undefined;

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

    let funcaoDesconto = obterDescontoCategoria(categoria);

if(cupom === 'NULABSSA' || cupom === 'ALURANU'){

    return funcaoDesconto += 10;

}else{

    return funcaoDesconto;
}

}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {

    if(Array.isArray(precos) && precos.length !== 0 && Array.isArray(categorias) && categorias.length !== 0){
        
        let resultado = 0;
        
        for(let i = 0; i < categorias.length; i++){

        let desconto = obterDescontoTotal(categorias[i], cupom);
        resultado += precos[i] - (precos[i] * desconto) / 100;

    }
    return resultado;

} else {

    return undefined;

}

}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    let  nomeDividido = nomeCompleto.split (" ");

    for( i = 0; i < nomeDividido.length; i++ ){
    
    if(nomeDividido[i].length <= 3){

        nomeDividido[i] = nomeDividido[i].toLowerCase();
    
    }else{
        
        nomeDividido[i] =  nomeDividido[i][0].toUpperCase() + nomeDividido[i].slice(1).toLowerCase();
         }

    }
    return nomeDividido.join (" ");
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
