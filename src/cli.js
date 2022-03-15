const { listaProdutos, listaCategorias } = require("./api-service");
const { formatarValor } = require("./objetos");

async function processarOpcao(opcao) {
  console.log(`A opção digitada foi: ${opcao}`);
  let retorno, produtos, categorias;

  switch (opcao.toUpperCase()) {
    case "PRODUTOS":
      retorno = await listaProdutos();
      break;
    case "PRODUTOS-FORMATADOS":
      retorno = formatarPreco(await listaProdutos());
      break;
    case "CATEGORIAS":
      retorno = await listaCategorias();
      break;
    case "DESCONTOS":
      produtos = formataValorProdutos(await listaProdutos());
      categorias = await listaCategorias();

    retorno = produtos.map((p) => {
      const categoria = categorias.find((c) => p.categoria === c.nome);
      return { ...p, desconto: categoria?.desconto || 0 };
    });
      break;
    default:
      throw new Error ((opcao === "") ? "Informe uma opção." : `Opção inválida: ${ opcao }`);	      
    }
  return retorno;
}

function formataValorProdutos(produtos) {
  return produtos.map((p) => ({ ...p, preco: formatarValor(p.preco) }));
}

const formatarPreco = produtos => {
  produtos.forEach(produto => {
    produto.preco = produto.preco.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    });
  });
  return produtos;
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
