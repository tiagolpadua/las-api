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

const CATEGORIAS = [{ nome: "Alimentação", desconto: 30 }, { nome: "Infantil", desconto: 15 }];
const CUPONS_VALIDOS = ["NULABSSA", "ALURANU"];

// =========
// Essencial
// =========


function isValidObject(produtos) {


    return typeof (produtos) === "object" && produtos.length > 0;
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {
    let menorPreco = 0;
    let produtoMenorPreco = undefined;
    if (isValidObject(produtos)) {

        produtos.forEach((produto) => {

            if (menorPreco === 0) {
                menorPreco = produto.preco;
            }

            if (produto.preco < menorPreco) {
                menorPreco = produto.preco;
                produtoMenorPreco = produto;

            }

        });

    }
    return produtoMenorPreco;
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    let maiorPreco = 0;
    let produtoMaiorPreco = undefined;
    if (isValidObject(produtos)) {

        produtos.forEach((produto) => {



            if (produto.preco > maiorPreco) {
                maiorPreco = produto.preco;
                produtoMaiorPreco = produto;
            }


        });

    }
    return produtoMaiorPreco;
}


// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {
    return "R$ " + valor.toLocaleString("pt-br", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function incluirPrecoFormatado(produto) {
    produto.precoFormatado = formatarValor(produto.preco);
    return produto;
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
    let desconto = 0;
    CATEGORIAS.forEach((categoria) => {


        if (categoria.nome == nomeCategoria) {

            desconto = categoria.desconto;


        }



    });

    return desconto;
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {

    return isValidObject(produtos) ? produtos.filter(produto => produto.preco < precoMaximo) : undefined;
}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    let sum = 0;



    if (isValidObject(produtos)) {

        produtos.forEach((produto) => {
            sum += produto.preco * produto.quantidade;



        });

    }
    return sum > 0 ? sum : undefined;
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {

    // eslint-disable-next-line no-unused-vars
    if (isValidObject(produtos)) {
        const produto = { maiorPreco: obterMaiorPreco(produtos), menorPreco: obterMenorPreco(produtos) };
        return produto;

    }





}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    let produtosOrcamento = [];
    if (isValidObject(produtos)) {
        produtosOrcamento = produtos.filter((produto) => produto.preco <= maiorValor && produto.preco >= menorValor);
    }
    return produtosOrcamento.length > 0 ? produtosOrcamento : undefined;


}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {

    return CUPONS_VALIDOS.includes(cupom.texto);
}



function obterDescontoTotal(categoria, cupom) {


    let descontoCategoria = obterDescontoCategoria(categoria);



    if (cupomEhValido(cupom) && descontoCategoria) {

        if (cupom.desconto > 0) {
            return descontoCategoria + cupom.desconto;
        }


    } else if (cupomEhValido(cupom)) {
        return cupom.desconto;
    }

    if (descontoCategoria) {
        return descontoCategoria;
    }


    return 0;
}


// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {

    let totalSemDesconto = 0;

    let desconto = 0;
    let total = 0;
    if (isValidObject(produtos)) {
        totalSemDesconto = calcularTotalDaCompra(produtos);

        produtos.forEach((produto) => {

            console.log(produto.categoria);


            desconto += ((obterDescontoTotal(produto.categoria, cupom) / 100) * produto.preco) * produto.quantidade;



        });





        return totalSemDesconto - desconto;

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
