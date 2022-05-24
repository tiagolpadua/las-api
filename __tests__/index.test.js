const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

describe("Página Inicial do Projeto", () => {
  test("URL da Raiz", async () => {
    const resposta = await request.get("/");
    expect(resposta.statusCode).toBe(200);
    expect(resposta.text).toBe(
      "# LAS - Licenciamento de Ambulantes de Salvador"
    );
  });
});
