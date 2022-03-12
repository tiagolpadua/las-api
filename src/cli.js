const { GET } = require("./api-service");
const { formatarValor } = require("./objetos");

const produtosComPrecosFormatados = async function () {
  const produtos = await GET("produtos");
  return produtos.map((el) => ({ ...el, preco: formatarValor(el.preco) }));
};

const produtosComDescontos = async function () {
  const categorias = await GET("categorias");
  const produtosFormatados = await produtosComPrecosFormatados();
  return produtosFormatados.map((produto) => {
    const cat = categorias.find((el) => el.nome === produto.categoria);
    return { ...produto, desconto: cat?.desconto || 0 };
  });
};

const processarOpcao = async function (opcao) {
  switch (opcao) {
    case "produtos":
    case "categorias":
      return await GET(opcao);
    case "produtos-formatados":
      return produtosComPrecosFormatados();
    case "descontos":
      return produtosComDescontos();
    case undefined:
      throw new Error("Você deve informar uma opção.");
    default:
      throw new Error(`Informe uma opção válida: ${opcao}`);
  }
};

/* istanbul ignore next */
async function run() {
  const opcao = process.argv[2];
  const saida = await processarOpcao(opcao);
  console.table(saida);
}

/* istanbul ignore next */
if (require.main === module) {
  run();
}

module.exports = {
  processarOpcao,
  produtosComPrecosFormatados,
};
