const { listaProdutos, listaCategorias } = require("./api-service.js");

const formatarPreco = products => {
  products.forEach(product => {
    product.preco = product.preco.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    });
  });
  return products;
};

const obterObjCategorias = arrCategorias => 
  arrCategorias.reduce((acc, { nome, desconto }) => {
    acc[nome] = desconto;
    return acc;
  },{});

const addDescontos = (arrayProdutos, objCategoras) => {
  return arrayProdutos.map(produto => {
    const preco = produto.preco;

    produto.preco = preco - (preco * objCategoras[produto.categoria] / 100 || 0);
    produto.desconto = objCategoras[produto.categoria] || 0;

    return produto;
  });
};

async function processarOpcao(opcao) {
  let auxCategorias, auxProdutos;

  switch (opcao) {
    case "produtos":
      return await listaProdutos();
  
    case "produtos-formatados":
      return  formatarPreco(await listaProdutos());

    case "categorias":
      return await listaCategorias();

    case "descontos":
      auxCategorias = obterObjCategorias(await listaCategorias());
      auxProdutos = await listaProdutos();

      return formatarPreco(addDescontos(auxProdutos, auxCategorias));

    case undefined:
      throw new Error("Informe uma opção.");

    default:
      throw new Error(`Opção inválida: ${opcao}`);
  }
}

async function run() {
  const opcao = process.argv[2];
  const saida = await processarOpcao(opcao);
  console.table(saida);
}

if (require.main === module) {
  run();
}

module.exports = {
  processarOpcao,
  obterObjCategorias,
  run
};