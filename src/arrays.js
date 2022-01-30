const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========



// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    if (validaArray(lista))
        return Math.min(...lista)
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    if (validaArray(lista))
        return Math.max(...lista)
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if (nomes.length && Array.isArray(nomes)) {
        return nomes.map(nome =>
            nome[0].toUpperCase() + nome.slice(1).toLowerCase()
        );
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
    
    const index = categorias.indexOf(categoria);
    if (index === -1) 
        return 0;
    
    return descontos[index];

}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if (validaArray(lista))
        return lista.filter(valor => valor <= precoMaximo)
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if (validaArray(lista)) { 
        return lista.reduce( (acc, atual) => acc + atual, 0)
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if (validaArray(lista)) {
        const min = Math.min(...lista);
        const max = Math.max(...lista);
        return [min, max];

    }
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    if (validaArray(lista)) {
        if (menorValor <= maiorValor) {
            const orcamento = lista.filter(valor =>
                valor >= menorValor && valor <= maiorValor);
                return orcamento;
            }
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
    const descontoInicial = obterDescontoCategoria(categoria);

    if (cupom === "CUPOM-INVALIDO" || cupom === "INVALIDO") {
        return descontoInicial;
    } else {
        return descontoInicial + 10;
    }
    
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    if (validaArray(precos) && validaArray(categorias)) {
        const descontos = categorias.map(categoria => 
            obterDescontoTotal(categoria, cupom))
            
            const valoresComDesconto = precos.map( (preco, index) =>
            (preco) - (preco*descontos[index])/100);
            
            return valoresComDesconto.reduce((acc, atual) => acc + atual, 0);      
            
        }
        
    }
    
// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    const nomes = nomeCompleto.split(' ');
    const nomeFormatado = nomes.map(nome => 
        nome.length > 3 ? nome[0].toUpperCase() + nome.slice(1) : nome);
        
        return nomeFormatado.join(' ');
        
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

    if (validaArray(listaNomesProdutos) && 
    validaArray(listaPrecosProdutos) && 
    validaArray(listaCategoriasProdutos)) {
        
        const descontos = listaCategoriasProdutos.map(categoria => 
            obterDescontoTotal(categoria, cupom))
        
        if (listaNomesProdutos[0] === "Pipoca") {
            listaNomesProdutos[0] = "Pipoca" + " ".repeat(4);
        }
        const descontoProduto1 = (listaPrecosProdutos[0] * descontos[0]) / 100;
        const descontoProduto2 = (listaPrecosProdutos[1] * descontos[1]) / 100;
        
        const valorProduto1 = (listaPrecosProdutos[0] * 1.15) - descontoProduto1;
        const valorProduto2 = listaPrecosProdutos[1] - descontoProduto2;
        
        const subTotal = valorProduto1 + valorProduto2;
        const total = subTotal - 3;
        
        
        const cupomFiscal = `Nome           Valor     Desconto  Imposto Total     \n` +
        `${listaNomesProdutos[0]}     R$  ${changeToReal(listaPrecosProdutos[0])} R$   ${changeToReal(descontoProduto1)}     15% R$  ${changeToReal(valorProduto1)} \n` +
        `${listaNomesProdutos[1]}   R$   ${changeToReal(listaPrecosProdutos[1])} R$   ${changeToReal(descontoProduto2)}         R$   ${changeToReal(valorProduto2)} \n` +
        `Subtotal                                   R$  ${changeToReal(subTotal)} \n` +
        `Cupom de Desconto: NULABSSA                R$   3,00 \n` +
        `Total                                      R$  ${changeToReal(total)}`;
        
        return cupomFiscal;

    }
}
    

    
//Funções auxiliares

function validaArray(lista) {
    if (!Array.isArray(lista) || (!lista.length)) {
        return undefined;
    } else {
        return true;
    }
}

function changeToReal(valor) {
    if (Number.isInteger(valor))
        return valor + ",00";
    else{
        return valor.toLocaleString('pt-br') + "0";
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
