const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/ufs");

describe("API UFs", () => {
  test("Listar UFs", async () => {
    const resp = await request.get("/ufs");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      "AC",
      "AL",
      "AM",
      "AP",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MG",
      "MS",
      "MT",
      "PA",
      "PB",
      "PE",
      "PI",
      "PR",
      "RJ",
      "RN",
      "RO",
      "RR",
      "RS",
      "SC",
      "SE",
      "SP",
      "TO",
    ]);
  });

  test("Listar Municípios por Estados Válidos", async () => {
    const resp = await request.get("/ufs/RR");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      { "nome": "Amajari" }, 
      { "nome": "Alto Alegre" },
      { "nome": "Boa Vista" }, 
      { "nome": "Bonfim" },
      { "nome": "Cantá" },
      { "nome": "Caracaraí" },
      { "nome": "Caroebe" }, 
      { "nome": "Iracema" }, 
      { "nome": "Mucajaí" }, 
      { "nome": "Normandia" },
      { "nome": "Pacaraima" },
      { "nome": "Rorainópolis" },
      { "nome": "São João da Baliza" },
      { "nome": "São Luiz" },
      { "nome": "Uiramutã" }
    ]);
  });

  test("Listar Municípios por Estados Inválidos", async () => {
    const resp = await request.get("/ufs/kk");
    expect(resp.statusCode).toBe(404);
  });
});