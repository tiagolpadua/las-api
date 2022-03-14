const { imprimirOpcoes, processarOpcao, carrinho } = require("./carrinho");

const { askQuestion } = require("./ask-question");
jest.mock("./ask-question");

const { listarProdutos } = require("./api-service");
jest.mock("./api-service");

const PRODUTOS_MOCK = require("../mocks/produtos.json");
const PRODUTOS_MOCK_DESCONTO = require("../mocks/produtos-desconto-carrinho.json");

// beforeEach(() => {

//   console.log = jest.fn();
//   console.table = jest.fn();
//   console.error = jest.fn();
//   resetCarrinho();
// });
  


test("Deve imprimir as opções.", () => {
    console.log = jest.fn();
    
    imprimirOpcoes();
    
    expect(console.log.mock.calls).toEqual([["Escolha uma opção:"], ["1 - Listar produtos"], ["2 - Incluir produto no carrinho"], ["3 - Visualizar carrinho"], ["4 - Finalizar compra"], ["x - Sair"]]);
  });




  test("Testar se a opção é válida", async () => {
    console.log = jest.fn();
    
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK_DESCONTO);
   
    await processarOpcao("5");
    
    
    expect(console.log.mock.calls).toEqual([["Digite uma opção válida!"]]);
  });

  describe("Desafio Opção 1" , () => {


  test("Deve listar os produtos quando digitar 1.", async () => {
    console.log = jest.fn();
    console.table = jest.fn();
    
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK_DESCONTO);
    
    await processarOpcao("1");
    
    
    expect(console.log.mock.calls).toEqual([["Lista de Produtos"]]);
    expect(console.table.mock.calls).toEqual([[[{"categoria": "Infantil", "desconto": 15, "nome": "Confete", "preco": 30}, {"categoria": "Infantil", "desconto": 15, "nome": "Serpentina", "preco": 10}, {"categoria": "Bebida", "desconto": 0, "nome": "Cerveja", "preco": 7}, {"categoria": "Bebida", "desconto": 0, "nome": "Refrigerante", "preco": 8}, {"categoria": "Alimentação", "desconto": 30, "nome": "Fruta", "preco": 12}]]]);
  });

});


  
  
  describe("Desafio Opção 2" , () => {

  
  test("Deve incluir os produtos quando digitar uma opção e quantidade válidas.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK_DESCONTO);

    const geraIndexProduto = "2";
    const geraQuantidadeProduto = 2;
    
    let opcao = geraIndexProduto;
    const produtoEscolhido = PRODUTOS_MOCK_DESCONTO[opcao];
    const produtoComQuantidadeETotal = {
      
      ...produtoEscolhido , quantidade: geraQuantidadeProduto, valor: +((geraQuantidadeProduto  * produtoEscolhido.preco) * (1 - (produtoEscolhido.desconto/100))).toFixed(2)
    };

    console.log = jest.fn();
    console.table = jest.fn();
    askQuestion.mockResolvedValueOnce(opcao);
    askQuestion.mockResolvedValueOnce(geraQuantidadeProduto.toString());

    await processarOpcao("2");
   
    expect(console.table.mock.calls).toEqual([[[produtoComQuantidadeETotal]]]);
  });

  
  test("Deve mostrar o erro quando digitar uma opção inválida.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK_DESCONTO);

    let opcao = "5";
    
    askQuestion.mockResolvedValueOnce(opcao);
    
    console.error = jest.fn();
    
    await processarOpcao("2");

    expect(console.error.mock.calls[0][0]).toEqual(`Produto não localizado: ${opcao}`);
   

  });

  test("Deve mostrar o erro quando digitar uma quantidade inválida.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);

    const geraIndexProduto = "2";
    const geraQuantidadeProduto = 0;
    
    let opcao = geraIndexProduto;
    
    console.table = jest.fn();
    console.error = jest.fn();
   
   askQuestion.mockResolvedValueOnce(opcao);
   askQuestion.mockResolvedValueOnce(geraQuantidadeProduto.toString());

    await processarOpcao("2");
   
    expect(console.error.mock.calls[0][0]).toEqual(`Quantidade inválida: ${geraQuantidadeProduto}`);
    
  });

  test("Deve verificar mensagem que o produto foi incluido no carrinho.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK_DESCONTO);

    const geraIndexProduto = "2";
    const geraQuantidadeProduto = 2;
    
    let opcao = geraIndexProduto;

    
    console.table = jest.fn();
    console.log = jest.fn();
    askQuestion.mockResolvedValueOnce(opcao);
    askQuestion.mockResolvedValueOnce(geraQuantidadeProduto.toString());
    

    await processarOpcao("2");
   
    expect(console.log.mock.calls[0][0]).toEqual("Produto incluído com sucesso no carrinho.");
});

  test("Deve verificar se há produtos no carrinho.", async () => {
    
   listarProdutos.mockResolvedValue(PRODUTOS_MOCK_DESCONTO);

    const geraIndexProduto =  "2";
    const geraQuantidadeProduto = 2;
    
    let opcao = geraIndexProduto;
    
    
    askQuestion.mockResolvedValueOnce(opcao);
    askQuestion.mockResolvedValueOnce(geraQuantidadeProduto.toString());
    
    await processarOpcao("2");

    console.log = jest.fn();
    console.table = jest.fn();
    console.error = jest.fn();


    await processarOpcao("3");
   
    expect(console.log.mock.calls).toEqual([["Carrinho de Compras"]]);
    expect(console.table.mock.calls).toEqual([[carrinho]]);

  });

  
});
  
  

  

  describe("Desafio Opção 4" , () => {

  test("Deve verificar conslusão da compra.", async () => {
    
    
   
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK_DESCONTO);

    const geraIndexProduto =  "2";
    const geraQuantidadeProduto = 2;
    
    let opcao = geraIndexProduto;
    
    
    askQuestion.mockResolvedValueOnce(opcao);
    askQuestion.mockResolvedValueOnce(geraQuantidadeProduto.toString());
    
    await processarOpcao("2");
 
    

     console.log = jest.fn();
     console.table = jest.fn();
     
 
     askQuestion.mockResolvedValueOnce("ALURANU");
     askQuestion.mockResolvedValueOnce("10");
 
     await processarOpcao("4");

   
    expect(console.log.mock.calls).toEqual([["Concluir compra"], ["Subtotal: R$ 56.00"], ["Total: R$ 50.40"], ["Compra finalizada com sucesso!"]]);
     expect(console.table.mock.calls).toEqual([[carrinho]]);
   
    });

  });





