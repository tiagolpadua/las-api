const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) { 
    return Array.isArray(lista) === false || lista[0] === undefined ? undefined : menorPreco(lista);  

    function menorPreco(precos){
        let menorValor = 0;
        for (let i = 0; i < precos.length; i++){
            i === 0 ? menorValor = precos[i] : menorValor = Math.min(menorValor, precos[i]);               
        }
        return menorValor;
    }   
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {    
    return Array.isArray(lista) === false || lista[0] === undefined ? undefined : maiorPreco(lista);  

    function maiorPreco(precos){
        let maiorValor = 0;
        for (let i = 0; i < precos.length; i++){
            i === 0 ? maiorValor = precos[i] : maiorValor = Math.max(maiorValor, precos[i]);               
        }
        return maiorValor;
    }
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    return Array.isArray(nomes) === false || nomes[0] === undefined ? undefined : capitalizandoNomes(nomes);

    function capitalizandoNomes(array){
        let nome = '';
        let resultado = [];
        for (let i = 0; i < array.length; i++){
            for(let x = 0; x < array[i].length; x++){
                x === 0 ? nome += array[i][x].toUpperCase() : nome += array[i][x].toLowerCase();                
            }
            resultado.push(nome);
            nome = '';
        }
        return resultado;
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
    if (categoria === categorias[0]){
        return descontos[0];
    }else if (categoria === categorias[1]){
        return descontos[1];
    }else{
        return 0;
    }    
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    return Array.isArray(lista) === false || lista[0] === undefined ? undefined : listaPrecosMenores(lista, precoMaximo);

    function listaPrecosMenores(array, orcamento){
        let resultado = [];        
        for (let i = 0; i < array.length; i++){
            array[i] <= orcamento ? resultado.push(array[i]) : resultado = resultado;
        }
        return resultado;
    }
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    return Array.isArray(lista) === false || lista[0] === undefined ? undefined : calculaValorTotal(lista);

    function calculaValorTotal(valores){
        let resultado = 0;
        valores.forEach(valor => resultado += valor);
        return resultado;
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    return Array.isArray(lista) === false || lista[0] === undefined ? undefined : calculaMaiorMenor(lista);

    function calculaMaiorMenor(precos){
        let resultado = [];
        let maiorValor, menorValor = 0;
        for (let i = 0; i < precos.length; i++){
            if (i === 0){
                maiorValor = precos[i];
                menorValor = precos[i];
            }else{
                maiorValor = Math.max(maiorValor, precos[i]);
                menorValor = Math.min(menorValor, precos[i]);
            }            
        }
        resultado.push(menorValor, maiorValor);        
        return resultado;
    }

}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    return Array.isArray(lista) === false || lista[0] === undefined ? undefined : calculaOrcamento(lista, menorValor, maiorValor);

    function calculaOrcamento(valores, menor, maior){
        let resultado = [];
        if ( menor <= maior){
            for (let i = 0; i < valores.length; i++){
                valores[i] >= menor && valores[i] <= maior ? resultado.push(valores[i]) : resultado = resultado;                
            } 
            return resultado;                       
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
    let resultado = '';
    if (verificaCupom(cupom) === true){
        return (obterDescontoCategoria(categoria) != 0) ? resultado = obterDescontoCategoria(categoria) : 0;        
    }else{
        return (obterDescontoCategoria(categoria) != 0) ? resultado = obterDescontoCategoria(categoria) + 10 : 10;        
    }
    
    function verificaCupom (voucher){
        return voucher === "CUPOM-INVALIDO" || voucher === "INVALIDO" ? true : false;
    }    
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    return precos[0] === undefined || Array.isArray(precos) === false ? undefined : calculaTotal(precos, categorias, cupom);
    
    function calculaTotal(preco, categoria, voucher){
        let total = 0, taxa = 0;
        for (let i = 0; i < preco.length; i++){
            taxa = obterDescontoTotal(categoria[i], voucher);
            total += preco[i] * ((100 - taxa ) / 100);
        }
        return total;

    }
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    const nome = nomeCompleto.split(" ");
    let resultado = '';
    for (let i = 0; i < nome.length; i++){
        for(let x = 0; x < nome[i].length; x++){
            x === 0 && nome[i].length > 2 ? resultado += nome[i][x].toUpperCase() : resultado += nome[i][x].toLowerCase();                           
        }
        resultado += ' ';                
    }
    resultado = resultado.trim();
    return resultado           
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
