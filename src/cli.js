const {listarProdutos, listarCategorias}= require("./api-service");


async function processarOpcao(opcao) {
  console.log(opcao);
  if(opcao===undefined){
    throw new Error("Informe uma opção.");
  }
  let retorno;
  let produtos;
  let categorias;
  switch (opcao.toUpperCase()) {
    case "PRODUTOS":
      retorno = await listarProdutos();
      break;
    case "DESCONTOS":
      produtos = await listarProdutos();
      categorias = await listarCategorias();

      retorno = produtos.map((p)=>{
        const categoria = categorias.find((c)=>p.categoria === c.nome);
        return{...p, desconto: categoria?.desconto || 0};
      } );

      break;
    default:
      throw new Error(`Opção invalida: ${opcao}`);
  }
  return retorno;
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
