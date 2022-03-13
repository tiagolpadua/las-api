const { listarProdutos, listarCategorias } = require("./api-service");
const { formatarValor } = require("./objetos");

async function processarOpcao(opcao) {
  // TODO
  console.log(`A opção digitada foi: ${opcao}`);
  let retorno;
  let produtos;
  let categorias;

  switch (opcao.toUpperCase()) {
    case "PRODUTOS":
      retorno = await listarProdutos();
      break;

    case "PRODUTOS-FORMATADOS":
      retorno = formataValorProdutos(await listarProdutos());

      // retorno = ProdutoFormatado;
      // console.log(retorno);
      break;

    case "DESCONTOS":
      produtos = formataValorProdutos(await listarProdutos());
      categorias = await listarCategorias();

      retorno = produtos = produtos.map((p) => {
        const categoria = categorias.find((c) => p.categoria === c.nome);

        return { ...p, desconto: categoria?.desconto || 0 };
      });

      break;

    // case "CUPONS":
    //   retorno = await listarCupons();
    //   break;

    default:
      throw new Error(`Opção inválida: ${opcao}`);
  }
  return retorno;
}

function formataValorProdutos(produtos) {
  return produtos.map((p) => ({ ...p, preco: formatarValor(p.preco) }));
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
};
