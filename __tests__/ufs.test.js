const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/uf.js");

describe("API de UFs", () => {
  test("Listar UFs", async () => {
    const resp = await request.get("/ufs");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      { sigla: "AC" },
      { sigla: "AL" },
      { sigla: "AM" },
      { sigla: "AP" },
      { sigla: "BA" },
      { sigla: "CE" },
      { sigla: "DF" },
      { sigla: "ES" },
      { sigla: "GO" },
      { sigla: "MA" },
      { sigla: "MG" },
      { sigla: "MS" },
      { sigla: "MT" },
      { sigla: "PA" },
      { sigla: "PB" },
      { sigla: "PE" },
      { sigla: "PI" },
      { sigla: "PR" },
      { sigla: "RJ" },
      { sigla: "RN" },
      { sigla: "RO" },
      { sigla: "RR" },
      { sigla: "RS" },
      { sigla: "SC" },
      { sigla: "SE" },
      { sigla: "SP" },
      { sigla: "TO" },
    ]);
  });
});
