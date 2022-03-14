const { listarProdutos, listarCategorias, } = require("./api-service");
const { formatarValor } = require("./objetos");

const formataValoresDeProdutos = produtos => produtos.map((p) => ({ ...p, preco: formatarValor(p.preco) }));


async function processarOpcao(opcao) {
  const opcoesValidas = ["produtos", "produtos-formatados", "categorias", "descontos"];
  let valorDeRetorno;

  if (!opcoesValidas.includes(opcao)) {
    throw new Error((opcao === undefined) ? "Informe uma opção." : `Opção inválida: ${opcao}`);
  }

  if (opcao === opcoesValidas[0]) {
    valorDeRetorno = await listarProdutos();
  }

  if (opcao === opcoesValidas[1]) {
    const listaDeProdutos = await listarProdutos();
    valorDeRetorno = formataValoresDeProdutos(listaDeProdutos);
  }

  if (opcao === opcoesValidas[2]) {
    valorDeRetorno = await listarCategorias();
  }

  if (opcao === opcoesValidas[3]) {
    const listaDeProdutos = await listarProdutos();
    const listaDeCategorias = await listarCategorias();

    const listaComDescontos = listaDeProdutos.map(p => {
      const categoria = listaDeCategorias.find(c => p.categoria === c.nome);
      return { ...p, desconto: categoria?.desconto || 0 };
    });

    valorDeRetorno = formataValoresDeProdutos(listaComDescontos);
  }

  return valorDeRetorno;
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

