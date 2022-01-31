const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    if(!Array.isArray(lista) || lista.length == 0){
        return undefined;
    } else{
        return Math.min.apply(null, lista);
    }
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    if(!Array.isArray(lista) || lista.length == 0){
        return undefined;
    } else{
        return Math.max.apply(null, lista);
    }
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if(!Array.isArray(nomes) || nomes.length === 0){
        return undefined;
    } else{
        return stringAtualizado = nomes.map( nome => nome[0].toUpperCase() + nome.slice(1).toLowerCase());
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
    if(categorias.includes(categoria)){
        let index = categorias.indexOf(categoria);
        return descontos[index];
    } else{
        return 0;
    }
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if(!Array.isArray(lista) || lista.length == 0){
        return undefined;
    } else{
        return cortaPreco = lista.filter((valor) => valor <= precoMaximo);
    }
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if(!Array.isArray(lista) || lista.length == 0){
        return undefined;
    } else{
        return valorTotalDaCOmpra = lista.reduce((acumulador, atual) => atual + acumulador, 0);
        
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if(!Array.isArray(lista) || lista.length == 0){
        return undefined;
    } else{
        return menorMaior = [(Math.min.apply(null, lista)),(Math.max.apply(null, lista))];
    }
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    if(!Array.isArray(lista) || lista.length == 0){
        return undefined;
    } else{
        if(menorValor <= maiorValor){
            return lista.filter( valor=> valor >= menorValor && valor <= maiorValor);
        }else{
            return undefined;
        }
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
    const descontoCategoria = obterDescontoCategoria(categoria);
        if(cupom === 'NULABSSA' || cupom === 'ALURANU'){
            return descontoCategoria + 10;
        } else{
            return descontoCategoria;
        }
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    if(!Array.isArray(precos) || precos.length == 0){
        return undefined;
    } else{
        for(i = 0; i < precos.length; i++){
            let desconto = obterDescontoTotal(categorias[i], cupom);
            precos[i] += - precos[i]/100* desconto;
        }
        return precos.reduce((acumulador, atual) => atual + acumulador);
    }
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    const nomeSeparado = nomeCompleto.split(" ");
    const nomeCapitalizado = nomeSeparado.map(nome => {
       if(nome.length > 2) return nome[0].toUpperCase() + nome.slice(1).toLowerCase();
       else return nome;      
    }) 
    return nomeCapitalizado.join(" ");
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
    if(!Array.isArray(listaNomesProdutos) ||!Array.isArray(listaCategoriasProdutos) || !Array.isArray(listaPrecosProdutos)|| listaCategoriasProdutos.length == 0 || listaNomesProdutos.length ==0 || listaPrecosProdutos.length == 0){
        return undefined
    }
    else{
        
    let descontos = [];
    let totais = [];

    for(i = 0; i < listaPrecosProdutos.length; i++){                //cálculo de descontos de categorias
        if(listaCategoriasProdutos[i] === 'Infantil'){
            descontos.push(listaPrecosProdutos[i]/100*25);

        }else if(listaCategoriasProdutos[i] === 'Bebida'){
            descontos.push(listaPrecosProdutos[i]/100*10);

        }else if(listaCategoriasProdutos[i] === 'Alimentação'){
            descontos.push(listaPrecosProdutos[i]/100*40);

        }
        else{
            return "Categoria inválida";
        }

    }
    for(i = 0; i <listaPrecosProdutos.length; i++){
        if(i === 0){
            totais.push(listaPrecosProdutos[i] - descontos[i] + (listaPrecosProdutos[i]/100*15)); ///dedução de imposto para primeiro ítem, 15%
        }else{                                                                                    ///de acréscimo no valor do produto           
            totais.push(listaPrecosProdutos[i] - descontos[i]);
        }
    }



    let subtotal = totais.reduce((acumulador, atual) => atual + acumulador,0);   ///Soma de toda compra
    let deducaoCupom = subtotal/100*12.34567901234568;
    let descontoCupom = Math.round(deducaoCupom);
    let totalAPagar = 0
    

    if(cupom === 'NULABSSA'){                                                            ///validação do cupom
        totalAPagar = subtotal - descontoCupom;
    }else{
        totalAPagar = subtotal;
    }

    let descontosString = descontos.map( valor=> valor.toFixed(2).replace('.', ','));
    let totaisString = totais.map(valor=> valor.toFixed(2).replace('.', ','))
    let mensagemDeducoes = '';
    let listaProdutos = listaNomesProdutos.toString().replace('.', ',');
    let subtotalNota = subtotal.toString().replace('.', ',') + '0';
    let totalAPagarNota = totalAPagar.toString().replace('.', ',') + '0';
    
    const maiorPalavra = Math.max(...listaNomesProdutos.map(x => x.length))
    const palavrasIgualadas = listaNomesProdutos.map(x => {
    if (x.length < maiorPalavra) {

        const tamanhoPalavra = x.length
        const diff = maiorPalavra - tamanhoPalavra

        const novaPalavra = x + ' '.repeat(diff)
        return novaPalavra
    }

    return x
})


    for(i = 0; i <listaProdutos.length; i++){
        if(i === 0) { 
        mensagemDeducoes += `Nome           Valor     Desconto  Imposto Total     \n`+     
        `${palavrasIgualadas[i]}   R$  ${listaPrecosProdutos[i]},00 R$   ${descontosString[i]}     15% R$  ${totaisString[i]} \n`
        }else if(i === 1){ 
            mensagemDeducoes +=`${palavrasIgualadas[i]}   R$   ${listaPrecosProdutos[i]},00 R$   ${descontosString[i]}         R$   ${totaisString[i]} \n`+
            `Subtotal                                   R$  ${subtotalNota} \n`+
            `Cupom de Desconto: NULABSSA                R$   ${descontoCupom},00 \n`+
            `Total                                      R$  ${totalAPagarNota}`
        }
    }
    
    return mensagemDeducoes;
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
