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

const {
    listaEhInvalida
} = require("./arrays");

const CATEGORIAS = [{ nome: "Alimentação", desconto: 30 }, { nome: "Infantil", desconto: 15 }];



function categoriasComDesconto(categoria) {
    if (categoria === "Alimentação" || categoria === "Infantil") {
        return true;
    } else {
        return false;
    }
}

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {

    if (listaEhInvalida(produtos)) {
        return undefined;
    } else {
        let precos = produtos.map(produto => produto.preco);
        let menorPreco = Math.min(...precos);
        return produtos.find(produto => produto.preco === menorPreco);
    }
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {


    if (listaEhInvalida(produtos)) {
        return undefined;
    } else {
        let precos = produtos.map(produto => produto.preco);
        let maiorPreco = Math.max(...precos);
        return produtos.find(produto => produto.preco === maiorPreco);
    }
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;

}

function incluirPrecoFormatado(produto) {

    return {
        ...produto,
        precoFormatado: formatarValor(produto.preco)
    };
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
    if (categoriasComDesconto(nomeCategoria)) {
        let categoriaEDesconto = CATEGORIAS.find(categoria => nomeCategoria === categoria.nome);
        return categoriaEDesconto.desconto;
    } else {
        return 0;
    }
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    } else {
        return produtos.filter(produto => produto.preco <= precoMaximo);
    }
}


// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    let reducer = (previousValue, currentValue) => previousValue + currentValue;

    if (listaEhInvalida(produtos)) {
        return undefined;
    } else {
        let precos = produtos.map(produto => produto.preco * produto.quantidade);
        return precos.reduce(reducer);
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    } else {
        return {
            menorPreco: obterMenorPreco(produtos),
            maiorPreco: obterMaiorPreco(produtos)
        };
    }

}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    if (listaEhInvalida(produtos) || menorValor > maiorValor) {
        return undefined;
    } else {
        let abaixoDoMaximo = obterProdutosLimitadosAoOrcamento(produtos, maiorValor);
        return abaixoDoMaximo.filter(produto => produto.preco >= menorValor);
    }
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {
    const cupomEhAluranu = (cupom.texto === "ALURANU" && cupom.desconto === 15);
    const cupomEhNulabssa = (cupom.texto === "NULABSSA" && cupom.desconto === 10);
    return cupomEhAluranu || cupomEhNulabssa ? true : false;
}

function obterDescontoTotal(categoria, cupom) {
    if (cupomEhValido(cupom)) {
        return cupom.desconto + obterDescontoCategoria(categoria);
    } else {
        return obterDescontoCategoria(categoria);
    }

}


// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    } else {
        let descontos = 0;
        produtos.forEach(produto => {
            return descontos += produto.preco * produto.quantidade * obterDescontoTotal(produto.categoria, cupom) / 100;
        });
        return calcularTotalDaCompra(produtos) - descontos;
    }

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
