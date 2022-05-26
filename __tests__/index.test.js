const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");
const request = supertest(customExpress());

describe("Trivial", () => {
  test("Um teste trivial", async () => {
    const resp = await request.get("/");
    expect(resp.statusCode).toBe(200);
    expect(resp.text).toBe("Bem vindo");
  });
});
