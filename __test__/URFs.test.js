const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const rotas = supertest(customExpress());

const URFs = require("../src/repositorios/__mocks__/URF.json");
const municipios = require("../src/repositorios/__mocks__/municipios.json");

jest.mock("../src/repositorios/URFs");

describe("Testa API GET", () => {
  test("API URF SIGLAS", async () => {
    const response = await rotas.get("/ufs");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(URFs);
  });
});

describe("Testa API GET UF", () => {
  test("API URF", async () => {
    const sigla = "BA";
    const municipiosPorSigla = municipios
      .filter((dadosMunicipio) => dadosMunicipio["UF-sigla"] === sigla)
      .map((nomeMunicipio) => nomeMunicipio.nome);
    const response = await rotas.get(`/ufs/${sigla}/municipios`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(municipiosPorSigla);
  });

  test("API URF inválida", async () => {
    const sigla = "BAT";

    const response = await rotas.get(`/ufs/${sigla}/municipios`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      erro: [
        {
          nome: "isUFvalid",
          mensagem: "Digite uma UF válida",
          resultado: true,
        },
      ],
      status: "Id inválido fornecido",
    });
  });
});
