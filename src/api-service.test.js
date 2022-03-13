// Considere https://stupefied-keller-a2c79e.netlify.app como o endereço base de todas as chamadas de APIs
// - https://stupefied-keller-a2c79e.netlify.app/produtos.json
// - https://stupefied-keller-a2c79e.netlify.app/categorias.json
// - https://stupefied-keller-a2c79e.netlify.app/cupons.json

// Utilize as respostas "Mocadas" disponíveis em ../mocks

// Utilize a função de mock do Jest para mocar as respostas no node-fetch: https://jestjs.io/pt-BR/docs/mock-functions

// Utilize a lib node-fetch em sua versão 2 - https://www.npmjs.com/package/node-fetch

// const PRODUTOS_MOCK = require("../mocks/produtos.json");
// const CATEGORIAS_MOCK = require("../mocks/categorias.json");
// const CUPONS_MOCK = require("../mocks/cupons.json");

const fetch = require("node-fetch");
const { listaProdutos, listaCategorias, listaCuponsValidos } = require("./api-service.js");
const MOCKS = {
  PRODUTOS    : require("../mocks/produtos.json"),
  CATEGORIAS  : require("../mocks/categorias.json"),
  CUPONS      : require("../mocks/cupons.json")
};

jest.mock("node-fetch");

describe("Essencial", () => {
  //================================================================================================

  // Crie uma função e o teste desta função, que lista os produtos a partir da API e retorna um JSON
  // com esta lista de produtos
  // test: "Deve ter uma função que lista os produtos."

  test("Deve ter uma função que lista os produtos.", async () => {
    fetch.mockResolvedValue({
        status: 200,
        json: () => Promise.resolve(MOCKS.PRODUTOS)
    });

    expect(await listaProdutos()).toEqual(MOCKS.PRODUTOS);
  });

  //====================================================================================================

  // Crie uma função e o teste desta função, que lista as categorias a partir da API e retorna um JSON
  // com esta lista de categorias
  // test: "Deve ter uma função que lista as categorias."

  test("Deve ter uma função que lista as categorias.", async () => {
    fetch.mockResolvedValue({
        status: 200,
        json: () => Promise.resolve(MOCKS.CATEGORIAS)
    });

    expect(await listaCategorias()).toEqual(MOCKS.CATEGORIAS);
  });


  //=====================================================================================================

  // Crie uma função e o teste desta função, que lista os cupons válidos a partir da API e retorna um JSON
  // com esta lista de cupons válidos
  // test: "Deve ter uma função que lista os cupons válidos."

  test("Deve ter uma função que lista os cupons válidos.", async () => {
    fetch.mockResolvedValue({
        status: 200,
        json: () => Promise.resolve(MOCKS.CUPONS)
    });

    expect(await listaCuponsValidos()).toEqual(MOCKS.CUPONS);
  });

  //=====================================================================================================

  // Crie um teste para quando qualquer API for acionada, caso o status code seja diferente de 200,
  // ela deve lançar uma Exceção com o seguinte formato: `${response.statusText}: ${response.status}`
  // test "Deve tratar erros 404."

  // test("Uma tautologia.", () => {
  //   expect(1 === 1).toBe(true);
  // });

  test("Deve tratar erros 404.", async () => {
    fetch.mockResolvedValue({
      status: 404,
      statusText: "Not Found"
    });
  
    await expect(listaProdutos()).rejects.toThrow("Not Found: 404");
    await expect(listaCategorias()).rejects.toThrow("Not Found: 404");
    await expect(listaCuponsValidos()).rejects.toThrow("Not Found: 404");
  });
});
