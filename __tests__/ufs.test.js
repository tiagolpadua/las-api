const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/uf.js");

describe("API de UF e Municipios", () => {
  test("Listar UFs", async () => {
    const resp = await request.get("/ufs");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        sigla: "BA",
      },
      {
        sigla: "AC",
      },
      {
        sigla: "AL",
      },
      {
        sigla: "AP",
      },
      {
        sigla: "AM",
      },
      {
        sigla: "CE",
      },
      {
        sigla: "ES",
      },
      {
        sigla: "GO",
      },
      {
        sigla: "MA",
      },
      {
        sigla: "MT",
      },
      {
        sigla: "MS",
      },
      {
        sigla: "MG",
      },
      {
        sigla: "PA",
      },
      {
        sigla: "PB",
      },
      {
        sigla: "PR",
      },
      {
        sigla: "PE",
      },
      {
        sigla: "PI",
      },
      {
        sigla: "RJ",
      },
      {
        sigla: "RN",
      },
      {
        sigla: "RS",
      },
      {
        sigla: "RO",
      },
      {
        sigla: "RR",
      },
      {
        sigla: "SC",
      },
      {
        sigla: "SP",
      },
      {
        sigla: "SE",
      },
      {
        sigla: "TO",
      },
      {
        sigla: "DF",
      },
    ]);
  });

  test("Listar Municipio",async () => {
    const resp = await request.get("/ufs/ba/municipios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
        "Abaíra",
        "Abaré",
        "Acajutiba",
        "Adustina",
        "Água Fria",
        "Érico Cardoso",
        "Aiquara",
        "Alagoinhas"
    ]);
});

});
