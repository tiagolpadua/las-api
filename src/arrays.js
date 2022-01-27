const { capitalizar } = require('./funcoes');

const ehValido = (arr) => Array.isArray(arr) && arr.length !== 0;
const somaElementos = (anterior,atual) => anterior + atual;

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
	return lista.filter((valor) => valor <= precoMaximo);
}

const calcularTotalDaCompra = (lista) => {
	if(!ehValido(lista)){ 
		return undefined;
	}
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

const calcularTotalDaCompraComDescontos = (precos, categorias, cupom) => {
	if(!ehValido(precos) || !ehValido(categorias)){
		return undefined;
	}
	const total = precos.map((el,i) => {
		return el * (100 - obterDescontoTotal((categorias[i]), cupom)) / 100;
	});
	return total.reduce(somaElementos);
}

const capitalizarNomeCompleto = (nomeCompleto) => {
	const nomes = nomeCompleto.split(" ");
	const nomesCapitalizados = nomes.map((el) => el.length > 3 ? capitalizar(el) : el);
	return nomesCapitalizados.reduce((anterior, atual) => `${anterior} ${atual}`);
}
// =======
// Desafio
// =======

function gerarCupomFiscal(listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos, cupom) {
	const arrAux = [listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos];
	if (!arrAux.every((el) => ehValido(el))) {
		return undefined;
	}
	const totalDesconto = (calcularTotalDaCompraComDescontos(arrAux[1], arrAux[2],cupom));
	return cuponTest.replace(/[.]/g, ',');
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
