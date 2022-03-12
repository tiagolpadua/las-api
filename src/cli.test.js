const { GET } = require("./api-service");
const { processarOpcao } = require("./cli");
const { when } = require("jest-when");

const PRODUTOS_MOCK = require("../mocks/produtos.json");
const PRODUTOS_FORMATADO_MOCK = require("../mocks/produtos-formatado.json");
const CATEGORIAS_MOCK = require("../mocks/categorias.json");
const PRODUTOS_DESCONTO_MOCK = require("../mocks/produtos-desconto.json");
jest.mock("./api-service");

describe("Desejável", () => {
  it("Deve retornar uma lista de produtos à partir da linha de comandos.", async () => {
    GET.mockResolvedValue(PRODUTOS_MOCK);
    const produtos = await processarOpcao("produtos");
    expect(produtos).toEqual(PRODUTOS_MOCK);
  });
  
  it("Deve retornar uma lista de categorias à partir da linha de comandos.", async () => {
    GET.mockResolvedValue(CATEGORIAS_MOCK);
    const categorias = await processarOpcao("categorias");
    expect(categorias).toEqual(CATEGORIAS_MOCK);
  });

  it("Deve retornar uma lista de produtos com preços formatados à partir da linha de comandos.", async () => {
    GET.mockResolvedValue(PRODUTOS_MOCK);
    const produtosFormatados = await processarOpcao("produtos-formatados");
    expect(produtosFormatados).toEqual(PRODUTOS_FORMATADO_MOCK);
  });
  
  it("Deve retornar uma lista de produtos com descontos e preços formatados à partir da linha de comandos.", async () => {
    when(GET).calledWith("produtos").mockResolvedValue(PRODUTOS_MOCK);
    when(GET).calledWith("categorias").mockResolvedValue(CATEGORIAS_MOCK);
    const produtosDescontos = await processarOpcao("descontos");
    expect(produtosDescontos).toEqual(PRODUTOS_DESCONTO_MOCK);
  });
  
  it("Deve informar uma opção na linha de comando.", async () => {
    await expect(processarOpcao()).rejects.toThrow("Você deve informar uma opção.");
  });

  it("Deve validar uma opção passada na linha de comando.", async () => {
    await expect(processarOpcao("foo")).rejects.toThrow("Informe uma opção válida: foo");
    await expect(processarOpcao("bar")).rejects.toThrow("Informe uma opção válida: bar");
  });

});
