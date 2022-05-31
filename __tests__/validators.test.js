// const supertest = require("supertest");

const validacoes = require("../src/infraestrutura/validators/validators");

describe("Validação URL", () => {
  test("Deve retornar verdadeiro quando a URL for válida", async () => {
    const URL = "https://randomuser.me/api/portraits/women/50.jpg";
    const validacao = await validacoes.validarURL(URL);
    expect(validacao).toBe(true);
  });

  //   test("Deve retornar falso quando a URL for inválida", async () => {
  //     const URL = "https://random-data-api.com/api/address/random_addressa";
  //     const validacao = await validarURL(URL);
  //     expect(validacao).toBe(false);
  //   });
});
