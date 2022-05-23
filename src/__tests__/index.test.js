const supertest = require("supertest");
const customExpress = require("../config/customExpress");

const request = supertest(customExpress());

describe("Página Inicial", () => {
  test("URL Base", async () => {
    const resp = await request.get("/");
    expect(resp.text).toBe("Bem Vindo Ao LAS-API");
    expect(resp.statusCode).toBe(200);
  });
});
