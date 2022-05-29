const supertest = require("supertest");
const customExpress = require("../src/config/customExpress.js");

const request = supertest(customExpress());

describe("Página Inicial", () => {
  test("URL Base", async () => {
    const resp = await request.get("/");
    expect(resp.statusCode).toBe(200);
    expect(resp.text).toBe("Bem vindo ao LAS-API");
  });
});
