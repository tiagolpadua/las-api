const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const requisicao = supertest(customExpress());

jest.mock("../src/repositorios/usuario.js");
describe("Página de Usuários", () => {
  test("Listar Usuários", async () => {
    const resposta = await requisicao.get("/usuarios");
    expect(resposta.statusCode).toBe(200);
    expect(resposta.body).toEqual([
      /*lista fixa com usuarios*/
    ]);
  });
});
