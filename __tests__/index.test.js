const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const rotas = supertest(customExpress());

describe("Essencial", () => {
  test("Refatore a configuraçao de conexão", async () => {
    const response = await rotas.get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Bem-Vindo ao LAS-API");
  });
});
