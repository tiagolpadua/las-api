const validacoes = require("../src/infraestrutura/validacoes");

describe("Validações", () => {
  test("Verificar URL Inválida", async () => {
    const resp = await validacoes.isURLValida("KKKK");
    expect(resp).toBeFalsy();
  });
});
