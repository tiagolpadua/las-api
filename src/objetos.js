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


const { listaEhInvalida } = require("./arrays");

const validaCupom = ["NULABSSA", "ALURANU"];


// =========
// Essencial
// =========


// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {
    if (!listaEhInvalida(produtos)) {
        var menorPreco = produtos[0];
        produtos.map((item) => {
          if (item.preco < menorPreco.preco) {
            menorPreco = item;
          }
        });
        return menorPreco;
      }
      } 
    


// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    
    if (!listaEhInvalida(produtos)) {
        var maiorPreco = produtos[0];
        produtos.map((item) => {
          if (item.preco > maiorPreco.preco) {
            maiorPreco = item;
          }
        });
        return maiorPreco;
      }
      } 


// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {
    
    return `R$ ${parseFloat(valor).toFixed(2).toString().replace(".", ",")}`;
}
 


function incluirPrecoFormatado(produto) {

    produto["precoFormatado"] = formatarValor(produto.preco);
    return produto;

}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
    const categorias = ["Alimentação", "Infantil"];
    
    const descontos = [30, 15];

    const desconto = descontos[categorias.findIndex((item) => item === nomeCategoria)];

    if (desconto !== undefined) {
        return desconto;
     }else {
       return 0;
     }

}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor 
//do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {

   
    if(!Array.isArray(produtos) || produtos.length === 0){
        return undefined;
    }
	
	return produtos.filter((valor) => valor.preco <= precoMaximo ? valor : undefined);
}




// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {

    if(!Array.isArray(produtos) || produtos.length === 0){
        return undefined;
    }

    const total = produtos.reduce((acumulado, produto) => 
    (acumulado += produto.preco * produto.quantidade) , 0);
    
    return total;
    
    }

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {

    if(!Array.isArray(produtos) || produtos.length === 0){
        return undefined;
    }
    return {
        menorPreco: obterMenorPreco(produtos),
        maiorPreco:obterMaiorPreco(produtos)
    };
    
    }


// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {

    return Array.isArray(produtos) && produtos.length !== 0 && menorValor <= maiorValor ? 
    produtos.filter(valor => valor.preco >= menorValor && valor.preco <= maiorValor) : undefined;
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {

    return validaCupom.includes(cupom.texto) && cupom.desconto >= 0;
 }
    
function obterDescontoTotal(categoria, cupom) {

    if(cupomEhValido(cupom)){
        return obterDescontoCategoria(categoria) + cupom.desconto;
    }else{
        return obterDescontoCategoria(categoria);
    }
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {

    if(!Array.isArray(produtos) || produtos.length === 0){
        return undefined;
    } 
    
  const totalDasCompras = calcularTotalDaCompra(produtos);

  const totalDosDescontos = produtos.reduce((acumulado, {categoria , preco}) =>
  acumulado + (preco * obterDescontoTotal(categoria,cupom))/100,0);
  
  return totalDasCompras - totalDosDescontos;
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
