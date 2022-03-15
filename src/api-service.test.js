const fetch = require("node-fetch");

jest.mock("node-fetch");

const PRODUTOS_MOCK = require("../mocks/produtos.json");
const CATEGORIAS_MOCK = require("../mocks/categorias.json");
const CUPONS_MOCK = require("../mocks/cupons.json");


const { listarProdutos, listarCategoria, listarCupom } = require("./api-service");

describe("Essencial", () => {
  // Crie uma função e o teste desta função, que lista os produtos a partir da API e retorna um JSON
  // com esta lista de produtos
  // test: "Deve ter uma função que lista os produtos."
  test("Deve ter uma função que lista os produtos.", async () => {
    fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(PRODUTOS_MOCK)
    });

    const products = await listarProdutos();
    expect(products).toEqual(PRODUTOS_MOCK);
  });

  // Crie uma função e o teste desta função, que lista as categorias a partir da API e retorna um JSON
  // com esta lista de categorias
  // test: "Deve ter uma função que lista as categorias."
  test("Deve ter uma função que lista as categorias.", async () => {
    fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(CATEGORIAS_MOCK)
    });

    const categories = await listarCategoria();
    expect(categories).toEqual(CATEGORIAS_MOCK);
  });


  // Crie uma função e o teste desta função, que lista os cupons válidos a partir da API e retorna um JSON
  // com esta lista de cupons válidos
  // test: "Deve ter uma função que lista os cupons válidos."
  test("Deve ter uma função que lista os cupons.", async () => {
    fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(CUPONS_MOCK)
    });

    const cupons = await listarCupom();
    expect(cupons).toEqual(CUPONS_MOCK);
  });


  // Crie um teste para quando qualquer API for acionada, caso o status code seja diferente de 200,
  // ela deve lançar uma Exceção com o seguinte formato: `${response.statusText}: ${response.status}`
  // test "Deve tratar erros 404."
  test("Deve tratar erros 404.", async () => {
    fetch.mockResolvedValue({
      status: 404,
      statusText: "Not Found"
    });

    await expect(listarProdutos()).rejects.toThrow("Not Found: 404");
    await expect(listarCategoria()).rejects.toThrow("Not Found: 404");
    await expect(listarCupom()).rejects.toThrow("Not Found: 404");
  });
});