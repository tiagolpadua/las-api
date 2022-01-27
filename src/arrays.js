const { capitalizar } = require('./funcoes');

const validarArray = (arr) => Array.isArray(arr) && arr.length !== 0;
const somaElementos = (anterior,atual) => anterior + atual;

// =========
// Essencial
// =========
const obterMenorPreco = (lista) => validarArray(lista) ? Math.min(...lista) : undefined;
const obterMaiorPreco = (lista) => validarArray(lista) ? Math.max(...lista) : undefined;
const capitalizarNomes = (nomes) => !validarArray(nomes) ?  undefined : nomes.map((el) => capitalizar(el));

const obterDescontoCategoria = (categoria) => {
	const categorias = ["Alimentação", "Infantil"];
	const descontos = [30, 15];
	if(!categorias.includes(categoria)){
		return 0;
	}
	return descontos[categorias.indexOf(categoria)];
}

const obterPrecosLimitadosAoOrcamento = (lista,precoMaximo) => {
	if(!validarArray(lista)){
		return undefined;
	}
	return lista.filter((valor) => valor <= precoMaximo);
}

const calcularTotalDaCompra = (lista) => {
	if(!validarArray(lista)){ 
		return undefined;
	}
	return lista.reduce(somaElementos);
}

// =========
// Desejável
// =========
const obterMenorEMaiorPrecos = (lista) => {
	if (!validarArray(lista)) {
		return undefined;
  }
	const valoresMinMax = [];
	valoresMinMax.push(lista.reduce((anterior, atual) => anterior < atual ? anterior : atual));
	valoresMinMax.push(lista.reduce((anterior, atual) => anterior > atual ? anterior : atual));
	return valoresMinMax;
}

const obterPrecosDentroDoOrcamento = (lista, menorValor, maiorValor) => {
	if (!validarArray(lista) || !(menorValor <= maiorValor)) {
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

const calcularTotalDaCompraComDescontos = (precos, categorias, cupom) => {
	if(!validarArray(precos) || !validarArray(categorias)){
		return undefined;
	}
	return precos.map((el,i) => {
		return el * (100 - obterDescontoTotal((categorias[i]), cupom)) / 100;
	}).reduce(somaElementos);
}

const capitalizarNomeCompleto = (nomeCompleto) => {
	const nomes = nomeCompleto.split(" ");
	return nomes.map((el) => el.length > 3 ? capitalizar(el) : el).join(" ");
}
// =======
// Desafio
// =======

function gerarCupomFiscal(listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos, cupom) {
	const arrAux = [listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos];
	if (!arrAux.every((el) => validarArray(el))) {
		return undefined;
	}
	const totalDesconto = (calcularTotalDaCompraComDescontos(arrAux[1], arrAux[2],cupom));
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
	gerarCupomFiscal,
};
