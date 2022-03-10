// Utilize as respostas "Mocadas" disponíveis em ../mocks
// Utilize a função de mock do Jest para mocar as respostas no api-service: https://jestjs.io/pt-BR/docs/mock-functions
const { processarOpcao } = require("./cli");
const { listarProdutos, listarCategorias } = require("./api-service");

jest.mock("./api-service");

const PRODUTOS_MOCK = require("../mocks/produtos.json");
const PRODUTOS_FORMATADO_MOCK = require("../mocks/produtos-formatado.json");
const CATEGORIAS_MOCK = require("../mocks/categorias.json");
const PRODUTOS_DESCONTO_MOCK = require("../mocks/produtos-desconto.json");

describe("Desejável", () => {
  // Crie uma opção e o teste desta opção, que lista os produtos utilizando
  // o api-service quando é informado argumento 'produtos' na linha de comandos.
  // Utilize PRODUTOS_MOCK
  test ("Deve listar os produtos.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    const resultado = await processarOpcao("produtos");
    expect(resultado).toEqual(PRODUTOS_MOCK);
  });

  // Crie uma opção e o teste desta opção, que lista os produtos com o preço formatado utilizando
  // o api-service quando é informado argumento 'produtos' na linha de comandos.
  // Utilize PRODUTOS_FORMATADO_MOCK
  test ("Deve listar os produtos com preço formatado.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_FORMATADO_MOCK);
    const resultado = await processarOpcao("produtos");
    expect(resultado).toEqual(PRODUTOS_FORMATADO_MOCK);
  });

  // Crie uma opção e o teste desta opção, que lista as categorias utilizando
  // o api-service quando é informado argumento 'categorias' na linha de comandos
  // Utilize CATEGORIAS_MOCK
  test ("Deve listar as categorias.", async () => {
    listarCategorias.mockResolvedValue(CATEGORIAS_MOCK);
    const resultado = await processarOpcao("categorias");
    expect(resultado).toEqual(CATEGORIAS_MOCK);
  });

  // Crie uma opção e o teste desta opção, que lista as os produtos com preço formatado e o
  // desconto de sua categoria utilizando o api-service quando é informado argumento 'descontos'
  // na linha de comandos. Utilize PRODUTOS_DESCONTO_MOCK
  test ("Deve listar os produtos com preço formatado e desconto.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_DESCONTO_MOCK);
    const resultado = await processarOpcao("descontos");
    expect(resultado).toEqual(PRODUTOS_DESCONTO_MOCK);
  });

  // Valide se a opção informada é válida (não esqueça do teste :-)), se não for,
  // emita uma exceção: "Opção inválida: ${opcao-informada}"
  test ("Deve emitir erro se informar uma opção inválida.", async () => {
    await expect(processarOpcao("opcao-invalida")).rejects.toThrow("Opção inválida: opcao-invalida");
  });

  // Valide se foi informada alguma opção (não esqueça do teste :-)), se não for,
  // emita uma exceção: "Informe uma opção."
  test ("Deve emitir erro não informar uma opção.", async () => {
    await expect(processarOpcao()).rejects.toThrow("Informe uma opção.");
  });
});
