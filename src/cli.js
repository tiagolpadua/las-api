const { listaProdutos, listaCategorias } = require("./api-service");
const { incluirPrecoFormatado, obterDescontoCategoria } = require("./objetos");

async function processarOpcao(opcao) {
  const retornoProdutos = await listaProdutos();
  const retornoCategorias = await listaCategorias();

  switch (opcao) {
    case "produtos":
      return retornoProdutos;

    case "produtos-formatados":
      return retornoProdutos.map((parametro) => {
        let produtosFormatados = incluirPrecoFormatado(parametro);

        produtosFormatados["preco"] = produtosFormatados["precoFormatado"];
        delete produtosFormatados.precoFormatado;
        return produtosFormatados;
      });

    case "categorias":
      return await retornoCategorias;

    case "descontos":
      return retornoProdutos.map((parametro) => {
        let produtoFormatado = incluirPrecoFormatado(parametro);

        produtoFormatado["preco"] = produtoFormatado["precoFormatado"];
        produtoFormatado["desconto"] = obterDescontoCategoria(
          produtoFormatado["categoria"]
        );
        delete produtoFormatado.precoFormatado;
        return produtoFormatado;
      });

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

module.exports = { processarOpcao };

