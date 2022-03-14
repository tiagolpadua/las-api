const {listaProdutos, listaCategorias} = require("./api-service");
const {formatarValor} = require("./objetos");

async function processarOpcao(opcao) {
  
  let retorno;
  let produtos;
  let categorias;  

  if(opcao == "" || opcao == undefined){
    throw new Error("Informe uma opção.");
  }

  switch(opcao){
    case "produtos":
      retorno = await listaProdutos();
      break;

    case "descontos":
      produtos = formataValorDosProdutos (await listaProdutos());
      categorias = await listaCategorias();         

      retorno = produtos.map((algumProduto) => {
        const categoria = categorias.find((categoriaEncontrada) => algumProduto.categoria === categoriaEncontrada.nome);
        return {...algumProduto, desconto: categoria?.desconto || 0};
        
      });


      break;
    case "produtos-formatados":
        retorno = formataValorDosProdutos(await listaProdutos());
       break;

   case "categorias":
      retorno = await listaCategorias();
      break;

    default:
      throw new Error(`Opção inválida: ${opcao}`);
  }

  return retorno;

  function formataValorDosProdutos(produtos) {
    return produtos.map((produto) =>({
      ...produto, preco: formatarValor(produto.preco)
    }));
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
};
