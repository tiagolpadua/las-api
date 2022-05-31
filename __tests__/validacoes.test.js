const validacoes = require("../src/infraestrutura/validacoes");
const validacaoData = require("../src/models/eventos");

describe("Validações", () => {
  test("Verificar URL Inválida", async () => {
    const resp = await validacoes.isURLValida("KKKK");
    expect(resp).toBeFalsy();
  });

  test("Verificar data Inválida", async () => {
    const resp = await validacaoData.isDatasValidas("2022-05-20", "2022-04-15");
    expect(resp).toBeTruthy();
  });
});
