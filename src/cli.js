const { listarProdutos, listarCategorias } = require("./api-service");
const { formatarValor } = require("./objetos");

async function processarOpcao(opcao) {
  console.log(`A opção digitada foi: ${opcao}`);

  let retorno;
  let produtos;
  let categorias;

  if (opcao == "" || opcao == undefined){
    throw new Error("Favor informar uma opção");
  }

  switch (opcao.toUpperCase()){
    case "PRODUTOS":
      retorno = await listarProdutos();
      break;
    case "DESCONTOS":
      produtos = formataValorProdutos(await listarProdutos());
      categorias = await listarCategorias();
      
      retorno = produtos.map((p1) => {
        const categoria = categorias.find((c1) => p1.categoria === c1.nome);
        return {...p1, desconto: categoria?.desconto || 0};
      });   
      break;
    case "CATEGORIAS":
      retorno = await listarCategorias();
      break;
    case "PRODUTOS-FORMATADOS":
      retorno = formataValorProdutos(await listarProdutos());
      break;
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
