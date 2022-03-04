const { listarProdutos,listarCategorias,listarCuponsValidos } = require("./api-service");
const fetch = require("node-fetch");

// Considere https://stupefied-keller-a2c79e.netlify.app como o endereço base de todas as chamadas de APIs
// - https://stupefied-keller-a2c79e.netlify.app/produtos.json
// - https://stupefied-keller-a2c79e.netlify.app/categorias.json
// - https://stupefied-keller-a2c79e.netlify.app/cupons.json

// Utilize as respostas "Mocadas" disponíveis em ../mocks

// Utilize a função de mock do Jest para mocar as respostas no node-fetch: https://jestjs.io/pt-BR/docs/mock-functions

// Utilize a lib node-fetch em sua versão 2 - https://www.npmjs.com/package/node-fetch
jest.mock("node-fetch");

const PRODUTOS_MOCK = require("../mocks/produtos.json");
const CATEGORIAS_MOCK = require("../mocks/categorias.json");
const CUPONS_MOCK = require("../mocks/cupons.json");

describe("Essencial", () => {

  test("Deve ter uma função que lista os produtos", async () => {
  
    fetch.mockResolvedValue({
      status:200,
      JSON:()=>Promise.resolve(PRODUTOS_MOCK),
    });

    const produtos = await listarProdutos();
    expect(produtos).toEqual(PRODUTOS_MOCK);


  });

  test("Deve ter uma função que lista categorias", async () => {
  
    fetch.mockResolvedValue({
      status:200,
      JSON:()=>Promise.resolve(CATEGORIAS_MOCK),
    });

    const produtos = await listarCategorias();
    expect(produtos).toEqual(CATEGORIAS_MOCK);


  });

  test("Deve ter uma função que lista cupons válidos", async () => {
  
    fetch.mockResolvedValue({
      status:200,
      JSON:()=>Promise.resolve(CUPONS_MOCK),
    });

    const produtos = await listarCuponsValidos();
    expect(produtos).toEqual(CUPONS_MOCK);


  });


  test("Deve tratar exceção 404 caso ocorra", async () => {
  
    fetch.mockResolvedValue({
      statusText:"Not Found",
      status:404,
    });

   await expect(listarProdutos()).rejects.toThrow("Not Found: 404");


  });


});