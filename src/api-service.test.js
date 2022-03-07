const { GET } = require("./api-service");
const fetch = require("node-fetch");
jest.mock("node-fetch");
const PRODUTOS_MOCK = require("../mocks/produtos.json");
const CATEGORIAS_MOCK = require("../mocks/categorias.json");
const CUPONS_MOCK = require("../mocks/cupons.json");

describe("Essencial", () => {
  it("Deve exibir uma lista de produtos", async () => {
    fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(PRODUTOS_MOCK),
    });
    const produtos = await GET("produtos");
    expect(produtos).toEqual(PRODUTOS_MOCK);
  });

  it("Deve exibir uma lista de categorias", async () => {
    fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(CATEGORIAS_MOCK),
    });
    const categorias = await GET("categorias");
    expect(categorias).toEqual(CATEGORIAS_MOCK);
  });

  it("Deve exibir uma lista de cupons", async () => {
    fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(CUPONS_MOCK),
    });
    const cupons = await GET("cupons");
    expect(cupons).toEqual(CUPONS_MOCK);
  });

  it("Deve retornar Erro 404 Not Found", async () => {
    fetch.mockResolvedValue({
      statusText: "Not found",
      status: 404,
    });
    await expect(GET("produtos")).rejects.toThrow("Not found: 404");
  });
});
