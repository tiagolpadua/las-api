const {listarProdutos , listarCategorias } = require("./api-service.js");


 function formatarValor(valor) {
  
  return "R$ " + Number(valor).toFixed(2);
  
}

 function incluirPrecoFormatado(produto) {

   produto.forEach( item => {
    
    item["preco"]  = formatarValor(item.preco);
    
});

return produto;
}

function incluirPrecoFormatadoEDesconto(produto) {

   produto.forEach( item => {
    
    let valorDesconto;
    if(item.categoria === "Infantil") valorDesconto = 15;
    else if(item.categoria === "Alimentação") valorDesconto = 30;
    else valorDesconto = 0;

    item["preco"]  = formatarValor(item.preco);
    item["desconto"]   = valorDesconto;
    });

    return produto;
}


function verificarErros(opcao_informada) {
  
  if(!opcao_informada) {

    throw new Error("Informe uma opção.");

  }else{

    throw new Error(`Opção inválida: ${opcao_informada}`);

  }
}

async function processarOpcao(opcao) {
  // TODO
  const verificarOpcao = [...arguments];
  const opcoes = ["produtos" , "produtos-formatados", "categorias", "descontos" ];

  if(opcao === opcoes[0]) return listarProdutos();
  if(opcao === opcoes[1]) return incluirPrecoFormatado(await listarProdutos());
  if(opcao === opcoes[2]) return listarCategorias();
  if(opcao === opcoes[3]) return incluirPrecoFormatadoEDesconto(await listarProdutos());
  
  console.log(opcao);
  
  return verificarErros(verificarOpcao[0]);
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
  processarOpcao, run,
};
