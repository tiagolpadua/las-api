const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario.js");
describe("API de Usuários", () => {
  test("Listar Usuários", async () => {
    const res = await request.get("/usuarios");
    expect(res.body).toEqual();
  });
});
