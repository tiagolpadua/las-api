const { listarProdutos, listarCategorias } = require("./api-service");
const { formatarValor } = require("./objetos");

async function processarOpcao(opcao) {
  // TODO
  let retorno;
  let produtos;
  let categorias;

  console.log(`A opção digitada foi: ${opcao}`);
  switch(opcao.toUpperCase()) {
    case "PRODUTOS":
      retorno = await listarProdutos();
      break;
    case "DESCONTOS":
      produtos = formatarValorProdutos(await listarProdutos());
      categorias = await listarCategorias();

      retorno = produtos.map((p) => {
        const categoria = categorias.find((c) => p.categoria === c.nome);
        return {...p, desconto: categoria?.desconto || 0};
      });
      break;
    case "CATEGORIAS":
      retorno = await listarCategorias();
      break;
    case "PRODUTOS-FORMATADOS":
      retorno = await listarProdutos();
      break;
    default:
      throw new Error((opcao === "") ? "Informe uma opção: " : `Opção Inválida: ${opcao}`);
  }

  return retorno;
}

const formatarValorProdutos = (produtos) => {
  return produtos.map((p) => ({ ...p, preco: formatarValor(p.preco) }));
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
