const {listarProdutos, listarCategorias} = require("./api-service");
const {formatarValor} = require("./objetos");

async function processarOpcao(opcao) {

  let retorno;
  let produtos;
  let categorias;
 
  switch(opcao.toUpperCase()){

     case "PRODUTOS":
      retorno = await listarProdutos();
      break;

    case "PRODUTOS-FORMATADOS":
        retorno = formataValorProduto(await listarProdutos());
        break;  

    case "CATEGORIAS":
        retorno = await listarCategorias();
        break;

    case "DESCONTOS":
     produtos = formataValorProduto(await listarProdutos());
     categorias = await listarCategorias();

     retorno = produtos.map((p) => {
      const categoria = categorias.find((c) => p.categoria === c.nome);
      return {...p, desconto: categoria?.desconto || 0 };
    });  
    break;

    // case undefined:
    //   retorno = "Informe uma opção.";
    //   break;

    // default: 
    //   throw new Error(`Opção inválida: ${opcao}`);
      
  }
  return retorno;
}

function formataValorProduto(produtos){
  return produtos.map((p)=>({...p, preco: formatarValor(p.preco)}));
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