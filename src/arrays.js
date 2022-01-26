const { capitalizar } = require('./funcoes');
const ehValido = (arr) => Array.isArray(arr) && arr.length !== 0;
const somaElementos = (anterior,atual) => anterior + atual;

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========
const obterMenorPreco = (lista) => ehValido(lista) ? Math.min(...lista) : undefined;

const obterMaiorPreco = (lista) => ehValido(lista) ? Math.max(...lista) : undefined;

const capitalizarNomes = (nomes) => !ehValido(nomes) ?  undefined : nomes.map((el) => capitalizar(el));

const obterDescontoCategoria = (categoria) => {
	const categorias = ["Alimentação", "Infantil"];
	const descontos = [30, 15];
	if(!categorias.includes(categoria)){
		return 0;
	}
	return (descontos.at(categorias.indexOf(categoria)));
}

const obterPrecosLimitadosAoOrcamento = (lista,precoMaximo) => {
	if(!ehValido(lista)){
		return undefined;
	}
	return lista.filter((valor) => valor <= precoMaximo ? valor : false);
}

const calcularTotalDaCompra = (lista) => {
  if(!ehValido(lista)){ 
		return undefined;
	}
	//return lista.reduce((anterior, atual) => anterior + atual);
	return lista.reduce(somaElementos);
}

// =========
// Desejável
// =========
const obterMenorEMaiorPrecos = (lista) => {
	if (!ehValido(lista)) {
      return undefined;
  }
	const valoresMinMax = [];
	valoresMinMax.push(lista.reduce((anterior, atual) => anterior < atual ? anterior : atual));
	valoresMinMax.push(lista.reduce((anterior, atual) => anterior > atual ? anterior : atual));
	return valoresMinMax;
}
const obterPrecosDentroDoOrcamento = (lista, menorValor, maiorValor) => {
	if (!ehValido(lista) || !(menorValor <= maiorValor)) {
		return undefined;
	}
	return lista.filter((preco) => preco < maiorValor && preco >= menorValor ? preco : false);
}

const obterDescontoTotal = (categoria, cupom) => {
	const cuponsValidos = ["ALURANU", "NULABSSA"];
	if (cuponsValidos.includes(cupom)){
		return obterDescontoCategoria(categoria) + 10;
	}
	return obterDescontoCategoria(categoria);
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
	if(!ehValido(precos) || !ehValido(categorias)){
		return undefined;
	}
	const d = [];
	for (let index = 0; index < categorias.length; index++) {
		d.push(precos[index] * (100 - obterDescontoTotal(categorias[index], cupom)) / 100);
	}
	return d.reduce(somaElementos);
}

calcularTotalDaCompraComDescontos([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU');

const capitalizarNomeCompleto = (nomeCompleto) => {
	const a = nomeCompleto.split(" ");
	const b = a.map((el) => el.length > 3 ? capitalizar(el) : el);
	return b.reduce((anterior, atual) => `${anterior} ${atual}`);
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
