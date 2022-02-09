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

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {

    if(!Array.isArray(produtos) || produtos.length === 0){return undefined;}

    let menorPrecoProduto = produtos[0];
    let menorPreco = produtos[0].preco;

    for(let produto of produtos){
        if(produto.preco < menorPreco){
            menorPreco = produto.preco;
            menorPrecoProduto = produto;
        }
    }
    return menorPrecoProduto;
    
}




// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {

    if(!Array.isArray(produtos) || produtos.length === 0){return undefined;}

    let maiorPrecoProduto = produtos[0];
    let maiorPreco = produtos[0].preco;

    for(let produto of produtos){
        if(produto.preco > maiorPreco){
            maiorPreco = produto.preco;
            maiorPrecoProduto = produto;
        }
    }
    return maiorPrecoProduto;
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor){
    return `R$ ${valor},00`;
    
}

function incluirPrecoFormatado(produto){
    produto.precoFormatado = formatarValor(produto.preco);
    return produto;
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {

    let descontoTrinta = 30;
    let descontoQuinze = 15;
    
    if(nomeCategoria === CATEGORIAS[0].nome){
        return descontoTrinta;
    }else if(nomeCategoria === CATEGORIAS[1].nome){
        return descontoQuinze;
    }else{
        return 0;
    }
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo){
    if(!Array.isArray(produtos) || produtos.length === 0){return undefined;}

    let arrProdutosLimitados = [];

    for(let produto of produtos){
        if(produto.preco <= precoMaximo){
            arrProdutosLimitados.push(produto);
        }
    }
    return arrProdutosLimitados;
}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    if(!Array.isArray(produtos) || produtos.length === 0){return undefined;}

    
    let totalDaCompra = 0;

    for(let i of produtos){
        if(i.quantidade > 0){
            totalDaCompra += i.quantidade * i.preco;
        }
    }
    return totalDaCompra;
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos){
   
    if(!Array.isArray(produtos) || produtos.length === 0){return undefined;}

    let maiorValor = obterMaiorPreco(produtos);
    let menorValor = obterMenorPreco(produtos);


    let menorValorFormatado = incluirPrecoFormatado(menorValor);
    let maiorValorFormatado = incluirPrecoFormatado(maiorValor);

  
  const objeto = {
      menorPreco: menorValorFormatado,
      maiorPreco: maiorValorFormatado
  };
  return objeto;

}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor){

    if(!Array.isArray(produtos) || produtos.length === 0){return undefined;}

    if(maiorValor < menorValor){
        return undefined;
    }

    let puxarProdutos = [];

    for(let i of produtos){
        if(i.preco >= menorValor && i.preco <= maiorValor){
            puxarProdutos.push(i);
        }
    }
    return puxarProdutos;
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente

function cupomEhValido(cupom){
   return CUPONS_VALIDOS.includes(cupom);
}

function obterDescontoTotal(categoria, cupom){
    let validandoCupom = cupomEhValido(cupom.texto);
    let totalDeDesconto = 0;
  
   
   if(validandoCupom === true){
      if(cupom.desconto > 0){
          totalDeDesconto = cupom.desconto;
      }else{
          totalDeDesconto = 0;
      }
   }
    return totalDeDesconto + obterDescontoCategoria(categoria);
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom){

    if(!Array.isArray(produtos) || produtos.length === 0){return undefined;}

    let valorDaCompraSemDesconto = calcularTotalDaCompra(produtos);

    let descontoTotal = 0;

    for(let i of produtos){
        descontoTotal += i.preco * obterDescontoTotal(i.categoria, cupom) / 100;
    }
    return valorDaCompraSemDesconto - descontoTotal;

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
    constructor(){
        this.produtos = [];
    }
    incluirProduto(produto){
        this.produtos.push(produto);
    }
    excluirProduto(indice){
        this.produtos.splice(indice);
    }
    listarProdutos(){
       return this.produtos;
    }
    definirCupom(cupom){
        this.cupom = cupom;
    }
    obterCupom(){
        return this.cupom;
    }
    excluirCupom(){
       delete this.cupom;
    }
    subtotal(){
        return calcularTotalDaCompra(this.produtos);
    }

    total(){
        return calcularTotalDaCompraComDescontos(this.produtos, this.cupom);
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
