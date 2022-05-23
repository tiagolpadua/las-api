const supertest = require("supertest");
const customExpress = require("../config/customExpress");

const request = supertest(customExpress());

describe("Usuarios", () => {
  test("usuários", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual("");
  });
});
