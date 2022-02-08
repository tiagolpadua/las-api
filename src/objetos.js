
 const { calculaDesconto } = require('./funcoes');
//  const { obterPrecosDentroDoOrcamento } = require('./arrays');

//---------------------------------------------------------------------------------------
// Observações:
// Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista
// for vazia, retorne undefined.
//
// Para todos os objetos das atividades, considere as seguintes estruturas:
//
// type Produto = {
//   nome: string,
//   categoria: string,
//   quantidade: number,
//   preco: number,
//   precoFormatado: string
// }
//
// type Categoria = {
//   nome: string,
//   desconto: number
// }
//
// type Cupom = {
//   texto: string,
//   desconto: number
// }
//---------------------------------------------------------------------------------------

const CATEGORIAS = [{ nome: 'Alimentação', desconto: 30 }, { nome: 'Infantil', desconto: 15 }];
const CUPONS_VALIDOS = ['NULABSSA', 'ALURANU'];

// =========
// Func Aux

const listaEhInvalida = (lista) => !Array.isArray(lista) || lista.length === 0;


// =========

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {

    if(listaEhInvalida(produtos))  return undefined;

    const menorPreco = Math.min(...produtos.map(item => item.preco));
 
    return produtos.filter(item => item.preco === menorPreco)[0];
    

}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {

    if(listaEhInvalida(produtos))  return undefined;

    const menorPreco = Math.max(...produtos.map(item => item.preco));
 
    return produtos.filter(item => item.preco === menorPreco)[0];
}

// // Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// // chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {

    return `R$ ${valor.toFixed(2).replace('.' , ',')}`;
}

function incluirPrecoFormatado(produto) {

    // const precoComDesconto = calculaDesconto(produto.preco);

    produto["precoFormatado"] = formatarValor(produto.preco);
    
    return produto;

}

// // Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// // ou 0 se não houver desconto.
// // Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
    const categorias = ['Alimentação', 'Infantil', 'NULABSSA', 'ALURANU'];
    const descontos = [30, 15]

    return { 'Alimentação': 30, "Infantil": 15 }[nomeCategoria] | undefined
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {

    if(listaEhInvalida(produtos))  return undefined;
    return produtos.filter(produto => produto.preco <= precoMaximo);

}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {

    if(listaEhInvalida(produtos))  return undefined;

    return produtos.reduce((acc , obj) => {

          return  acc + (obj.quantidade * obj.preco);

    }, 0)

}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {

    if(listaEhInvalida(produtos))  return undefined;

    return ({
        
        menorPreco: obterMenorPreco(produtos),
        maiorPreco: obterMaiorPreco(produtos),
    })
}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    if(listaEhInvalida(produtos) )  return undefined;
    
     if (menorValor <= maiorValor) return produtos.filter(produto => produto.preco  >= menorValor && produto.preco <= maiorValor)
     else return undefined;
}
   



// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {

    const cuponsValidos = ['NULABSSA', 'ALURANU'];
    return cuponsValidos.indexOf(cupom) !== -1;
}

function obterDescontoTotal(categoria, cupom) {

 return  (cupom === 'NULABSSA' || cupom === 'ALURANU') ? categoria + 10 : 0;
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {

    if(listaEhInvalida(produtos) )  return undefined;

    const produtosComDesconto = produtos.map(item => {
        
        item.preco = 1 - (obterDescontoTotal(item.categoria, cupom)/100);
    });

    return calcularTotalDaCompra(produtosComDesconto);

}

// =======
// Desafio
// =======

// Crie uma classe chamada CarrinhoDeCompras
// O carrinho de compras deve ter as seguintes funcionalidades:
// - incluirProduto - função recebe um produto e o inclui na lista de produtos
// - excluirProduto - função recebe um índice e remove o produto naquele índice
// - listarProdutos - função lista os produtos já incluídos
// - definirCupom - função recebe um cupom e o armazena
// - obterCupom - função retorna o cupom armazenado
// - excluirCupom - função exclui o cupom armazenado
// - subtotal - função calcula o subtotal da compra - dica: utilizar função calcularTotalDaCompra definida anteriormente;
// - total - função calcula o total da compra com descontos - dica: utilizar função calcularTotalDaCompraComDescontos definida anteriormente;

class CarrinhoDeCompras {
}

module.exports = {
    obterMenorPreco,
    obterMaiorPreco,
    incluirPrecoFormatado,
    obterDescontoCategoria,
    obterProdutosLimitadosAoOrcamento,
    calcularTotalDaCompra,
    obterMenorEMaiorPrecos,
    obterProdutosDentroDoOrcamento,
    obterDescontoTotal,
    calcularTotalDaCompraComDescontos,
    CarrinhoDeCompras
};
