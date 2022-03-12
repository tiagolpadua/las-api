const { GET } = require("./api-service");
const { formatarValor } = require("./objetos");

const produtosComPrecosFormatados = async function () {
  const produtos = await GET("produtos");
  const tmp = produtos.map((produto) => ({
    ...produto,
    preco: formatarValor(produto.preco),
  }));
  return tmp;
};

const produtosComDescontos = async function () {
  const categorias = await GET("categorias");
  const produtosFormatados = await produtosComPrecosFormatados();
  return produtosFormatados.map(p => {
    const cat = categorias.find(c => c.nome === p.categoria);
    return { ...p, desconto: cat?.desconto || 0 };
  });
};

const processarOpcao = async function (opcao) {
  switch (opcao) {
    case "produtos":
    case "categorias":
      return await GET(opcao);
    case "produtos-formatados":
      return await produtosComPrecosFormatados();
    case "descontos":
      return await produtosComDescontos();
    case undefined:
      throw new Error("Você deve informar uma opção.");
    default:
      throw new Error(`Informe uma opção válida: ${opcao}`);
  }
};

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
};
