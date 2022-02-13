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
const CATEGORIAS = [{ nome: "Alimentação", desconto: 30 }, { nome: "Infantil", desconto: 15 }];
const CUPONS_VALIDOS = ["NULABSSA", "ALURANU"];

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {
    let listaPrecos = [];
    if (!listaEhInvalida(produtos)){
        produtos.forEach(produto => {
            listaPrecos.push(produto.preco);
        });
        let menorPreco = Math.min(...listaPrecos);
        let indice = listaPrecos.indexOf(menorPreco);
        return produtos[indice];
    }else{
        return undefined;
    }
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    let listaPrecos = [];
    if (!listaEhInvalida(produtos)){
        produtos.forEach(produto => {
            listaPrecos.push(produto.preco);
        });
        let menorPreco = Math.max(...listaPrecos);
        let indice = listaPrecos.indexOf(menorPreco);
        return produtos[indice];
    }else{
        return undefined;
    }
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {
    return `R$ ${valor},00`;
}
function incluirPrecoFormatado(produto) {
    produto.precoFormatado = formatarValor(produto.preco);
    return produto;
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
    const index = CATEGORIAS.findIndex((categoria) => categoria.nome === nomeCategoria);
    if (index === -1) {
        return 0;
    }else{
        return CATEGORIAS[index].desconto;
    }

}
// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
    const listaProdutos = [];
    if (!listaEhInvalida(produtos)){
        produtos.forEach(produto => {
            if (produto.preco <= precoMaximo) {
                listaProdutos.push(produto);
            }
        });
        return listaProdutos;
}else{
    return undefined;
}

}
// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    let valorTotal = 0;
    if (!listaEhInvalida(produtos)){
        produtos.forEach(produto => {
            valorTotal =  produto.preco*produto.quantidade + valorTotal;
        });
        return valorTotal;
    }else{
        return undefined;
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {
    if (!listaEhInvalida(produtos)){
        return {
            menorPreco: obterMenorPreco(produtos),
            maiorPreco: obterMaiorPreco(produtos),
        };
    }else{
        return undefined;
    }
}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    const listaOrcamento = [];
    if (!listaEhInvalida(produtos) && menorValor <= maiorValor){
        produtos.forEach(produto => {
            if (produto.preco <= maiorValor && produto.preco >= menorValor){
                listaOrcamento.push(produto);
            }
        });
        return listaOrcamento;
    }else{
        return undefined;
    }
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {
    return CUPONS_VALIDOS.includes(cupom.texto) && cupom.desconto > 0;
}

function obterDescontoTotal(categoria, cupom) {
    return cupomEhValido (cupom)
    ? obterDescontoCategoria(categoria) + cupom.desconto 
    : obterDescontoCategoria(categoria);
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
    let descontoTotal = 0;
    if (!listaEhInvalida(produtos)){
        const valorCompra = calcularTotalDaCompra(produtos);
        produtos.forEach((produto) => {
            descontoTotal += produto.preco * (obterDescontoTotal(produto.categoria, cupom))/100;
        });
        return valorCompra - descontoTotal;
    }else{
        return undefined;
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
    constructor () {
        this.listaDeProdutos = [];
    }
    
    incluirProduto(produto) {
        this.listaDeProdutos.push(produto);
    }

    excluirProduto(indice) {
        this.listaDeProdutos.splice(indice);
    }

    listarProdutos() {
        return this.listaDeProdutos;
    }

    definirCupom(cupom) {
        this.cupom = cupom;
    }

    obterCupom() {
        return this.cupom;
    }

    excluirCupom() {
        delete this.cupom;
    }

    subtotal() {
        return calcularTotalDaCompra(this.listaDeProdutos);
    }

    total() {
        return calcularTotalDaCompraComDescontos(this.listaDeProdutos, this.cupom);
    }
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
