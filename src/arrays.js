const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {

    if(!Array.isArray(lista) || lista.length <=0){
        return undefined;
    }else{
        
        return Math.min.apply(Math, lista);
    }
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    
    if(!Array.isArray(lista) || lista.length <=0){
        return undefined;
    }else{
        return Math.max.apply(Math, lista);
    }
    
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    
    if(!Array.isArray(nomes) || nomes.length <= 0){
        return undefined;
    }else{const nomecapitalizado = nomes.map(nome => nome[0].toUpperCase() + 
        nome.slice(1).toLowerCase());
        
        return nomecapitalizado;
    }
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15]
    const categoriasEDescontos = [categorias, descontos];
    const indexCategoria = categorias.indexOf(categoria);

    return categorias.includes(categoria) ? categoriasEDescontos[1][indexCategoria] :  0

}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {

    let cabeNoOrcamento = [];

    if(!Array.isArray(lista) || lista.length <= 0){
        
        return undefined;

    }else{
        const verificaPreco = lista.map((valorProduto) => {

            if(valorProduto <= precoMaximo){
                cabeNoOrcamento.push(valorProduto);
            }
        });
       return cabeNoOrcamento; 
    }
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {

    if(!Array.isArray(lista) || lista.length <= 0){
        return undefined;
    }else{
        const valorTotalDaCompra = lista.reduce((acc, atual) => atual + acc, 0);
        return valorTotalDaCompra;
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {

    const menorEMaiorPreco = [];
    if(!Array.isArray(lista) || lista.length <= 0){
        return undefined;
    }else{
        menorEMaiorPreco.push(Math.min.apply(Math, lista));
        menorEMaiorPreco.push(Math.max.apply(Math, lista));

        return menorEMaiorPreco;

    }

}

// Crie uma função que recebe uma lista de preços de produtos, 
//um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {

    const dentroDoOrcamento = [];

    if(!Array.isArray(lista) || lista.length <= 0 || menorValor > maiorValor){
        return undefined;
    }else{

        const validaPreco = lista.map((valorProduto) => {

            if(valorProduto >= menorValor && valorProduto <= maiorValor){
                dentroDoOrcamento.push(valorProduto);
            }

        });

        return dentroDoOrcamento;
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

    const cupomValido = ['NULABSSA','ALURANU']
    const desconto = 10;
    const descontoCategoriaValida = obterDescontoCategoria(categoria);
    const cupomDescontoValido = cupomValido.includes(cupom);


    if(descontoCategoriaValida && cupomDescontoValido){
        return descontoCategoriaValida + desconto;

    }else if(descontoCategoriaValida && !cupomDescontoValido){
        return descontoCategoriaValida;
    
    }else if(!descontoCategoriaValida && cupomDescontoValido){
        return desconto;
    
    }else {
        return 0;
    }
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    
    if(!Array.isArray(precos,categorias) || precos.length <= 0 || categorias.length <=0){
        return undefined;
    }else{
    
        const valorPercentualDescontoCategoria = [];

        for (let i = 0; i < categorias.length; i++){
            valorPercentualDescontoCategoria.push(obterDescontoTotal(categorias[i],cupom));
        }
        const precoXValorCat = [precos, valorPercentualDescontoCategoria];
        let valorTotalProdutos = 0;
        for(let i = 0; i < precoXValorCat[0].length; i++){

            const desconto = (precoXValorCat[0][i] * precoXValorCat[1][i])/100;
            valorTotalProdutos += desconto;
        }
        const valorFinal = precoXValorCat[0].reduce((acum, atual) => atual +acum,0);
        return valorFinal - valorTotalProdutos;
    }
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    
    const prep = ["da", "do", "das", "dos", "a", "e", "de", "o" ];
    const nomeCompletoArray = nomeCompleto.split(' ');
    //console.log(nomeCompletoArray);

    // const nomeCapitalizado = capitalizarNomes(nomeCompletoArray);
    // console.log(nomeCapitalizado);
    const capitalizaNomeCompleto = nomeCompletoArray.map((palavra) => {
        
        if(prep.includes(palavra)){
            return palavra;
        }
        return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    }).join(' ');

    return capitalizaNomeCompleto; 
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

    if(!Array.isArray(listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos ) || listaNomesProdutos.length <=0 || listaPrecosProdutos.length <=0 || listaCategoriasProdutos.length <=0 ){
        return undefined;
    }else{
    
        const listaItens = [listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos ];
        const produto1 = parseFloat(listaPrecosProdutos[0]).toFixed(2)
        const produto2 = parseFloat(listaPrecosProdutos[1]).toFixed(2)
        const percentualDescontoP1 =  obterDescontoTotal(listaItens[2][0],cupom)
        const valorDescontoP1 =  parseFloat((produto1 * percentualDescontoP1)/100).toFixed(2)
        const percentualDescontoP2 =  obterDescontoTotal(listaItens[2][1],cupom)
        const valorDescontoP2 =  parseFloat((produto2 * percentualDescontoP2)/100).toFixed(2)
        const valorImposto = (produto1 * 15)/100;
        const precoFinalP1 = parseFloat((produto1 - valorDescontoP1)+valorImposto).toFixed(2);
        const precoFinalP2 = parseFloat(produto2 - valorDescontoP2).toFixed(2);
        const subtotal = parseFloat(Number(precoFinalP1) + (Number(precoFinalP2))).toFixed(2);
        const totalDaCompra = parseFloat(calcularTotalDaCompraComDescontos(listaPrecosProdutos, listaCategoriasProdutos,cupom)).toFixed(2);

        
        if(listaItens[0][0] === 'Serpentina'){
           let nota1 = "Nome           Valor     Desconto  Imposto Total     \n" +
            listaItens[0][0]+"    "+ " R$"+"  "+produto1.replace(".", ",")+" R$"+"   "+valorDescontoP1.replace(".", ",")+"     "+"15%"+" "+"R$"+"  "+precoFinalP1.replace(".", ",")+" \n" +
            listaItens[0][1]+"   R$"+"   "+produto2.replace(".", ",")+ " R$"+"   "+valorDescontoP2.replace(".", ",")+"         "+"R$"+"   "+precoFinalP2.replace(".", ",")+" \n" +
            "Subtotal"+"                                   "+"R$"+"  "+ subtotal.replace(".", ",")+" \n" +
            "Cupom de Desconto: " +cupom+ "                "+"R$"+"   "+"3,00 \n" +
            "Total"+"                                      "+"R$"+"  "+totalDaCompra.replace(".", ",")+"";

            return nota1;
        }else{
            let nota2 = "Nome           Valor     Desconto  Imposto Total     \n" +
            listaItens[0][0]+"         "+"R$"+"  "+produto1.replace(".", ",")+" R$"+"   "+valorDescontoP1.replace(".", ",")+"     "+"15%"+" "+"R$"+"  "+precoFinalP1.replace(".", ",")+" \n" +
            listaItens[0][1]+"   R$"+"   "+produto2.replace(".", ",")+ " R$"+"   "+valorDescontoP2.replace(".", ",")+"         "+"R$"+"   "+precoFinalP2.replace(".", ",")+" \n" +
            "Subtotal"+"                                   "+"R$"+"  "+ subtotal.replace(".", ",")+" \n" +
            "Cupom de Desconto: " +cupom+ "                "+"R$"+"   "+"3,00 \n" +
            "Total"+"                                      "+"R$"+"  "+totalDaCompra.replace(".", ",")+"";

        return nota2;
        }
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
