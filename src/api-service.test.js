// Considere https://stupefied-keller-a2c79e.netlify.app como o endereço base de todas as chamadas de APIs
// - https://stupefied-keller-a2c79e.netlify.app/produtos.json
// - https://stupefied-keller-a2c79e.netlify.app/categorias.json
// - https://stupefied-keller-a2c79e.netlify.app/cupons.json

// Utilize as respostas "Mocadas" disponíveis em ../mocks

// Utilize a função de mock do Jest para mocar as respostas no node-fetch: https://jestjs.io/pt-BR/docs/mock-functions

// Utilize a lib node-fetch em sua versão 2 - https://www.npmjs.com/package/node-fetch

const { listarProdutos, listarCategoria, listarCuponsValidos } = require("./api-service");
const PRODUTOS_MOCK = require("../mocks/produtos.json");

const fetch = require("node-fetch");
jest.mock("node-fetch");
const CATEGORIAS_MOCK = require("../mocks/categorias.json");
const CUPONS_MOCK = require("../mocks/cupons.json");

describe("Essencial", () => {
  // Crie uma função e o teste desta função, que lista os produtos a partir da API e retorna um JSON
  // com esta lista de produtos
  // test: "Deve ter uma função que lista os produtos."
  test("Deve ter uma função que lista os produtos.", async () => {
    fetch.mockResolvedValue({
      staus: 200,
      json: () => Promise.resolve(PRODUTOS_MOCK)
    });
    const produtos = await listarProdutos();
    expect(produtos).toEqual (PRODUTOS_MOCK);
  });


  // Crie uma função e o teste desta função, que lista as categorias a partir da API e retorna um JSON
  // com esta lista de categorias
  // test: "Deve ter uma função que lista as categorias."
  test("Deve ter uma função que lista as categorias.", async () => {
    fetch.mockResolvedValue({
      staus: 200,
      json: () => Promise.resolve(CATEGORIAS_MOCK)
    });
    const categorias = await listarCategoria();
    expect(categorias).toEqual (CATEGORIAS_MOCK);
  });


  // Crie uma função e o teste desta função, que lista os cupons válidos a partir da API e retorna um JSON
  // com esta lista de cupons válidos
  // test: "Deve ter uma função que lista os cupons válidos."
  test("Deve ter uma função que lista os cupons válidos.", async () => {
    fetch.mockResolvedValue({
      staus: 200,
      json: () => Promise.resolve(CUPONS_MOCK)
    });
    const cuponsValidos = await listarCuponsValidos();
    expect(cuponsValidos).toEqual (CUPONS_MOCK);
  });

  // Crie um teste para quando qualquer API for acionada, caso o status code seja diferente de 200,
  // ela deve lançar uma Exceção com o seguinte formato: `${response.statusText}: ${response.status}`
  // test "Deve tratar erros 404."
  test("Deve tratar erros 404.", async () => {
    fetch.mockResolvedValue({
      status: 404,
      statusText: "Not found"
    });
    await expect(listarProdutos()).rejects.toThrow("Not found: 404");
    await expect(listarCategoria()).rejects.toThrow("Not found: 404");
    await expect(listarCuponsValidos()).rejects.toThrow("Not found: 404");
  });


});
