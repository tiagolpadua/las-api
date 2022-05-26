const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorio/ufs");

describe("API UFs", () => {
  test("Listar UFs", async () => {
    const resp = await request.get("/ufs");
    const ufs = [
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
    ];

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(ufs);
  });

  test("Listar Municipios por Estado", async () => {
    const resp01 = await request.get("/ufs/ba");
    const resp02 = await request.get("/ufs/jk");
    const municipiosBa = [
      "Abaíra",
      "Abaré",
      "Acajutiba",
      "Adustina",
      "Água Fria",
      "Érico Cardoso",
      "Aiquara",
      "Alagoinhas",
      "Alcobaça",
      "Almadina",
    ];

    expect(resp01.statusCode).toBe(200);
    expect(resp01.body).toEqual(municipiosBa);

    expect(resp02.statusCode).toBe(404);
  });
});
