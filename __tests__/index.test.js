const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());
describe("Página Inicial", () => {
  test("Retorno Get /", async () => {
    const resp = await request.get("/");
    expect(resp.statusCode).toBe(200);
    expect(resp.text).toBe("Bem Vindo ao Las-API");
  });
});
