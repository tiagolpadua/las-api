const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorio/tiposVendas");

describe("API TiposVendas", () => {
  test("Listar Tipos de Vendas", async () => {
    const resp = await request.get("/tipos-vendas");
    const tiposVendas = [
      {
        id: 1,
        descricao: "Bebidas",
      },
      {
        id: 2,
        descricao: "Alimentação",
      },
      {
        id: 3,
        descricao: "Abadá / Ingressos",
      },
    ];

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(tiposVendas);
  });

  test("Buscar Tipo de Venda por Id", async () => {
    const resp01 = await request.get("/tipos-vendas/1");
    const resp02 = await request.get("/tipos-vendas/99");
    const tipoVenda = {
      id: 1,
      descricao: "Bebidas",
    };

    // Id Válido
    expect(resp01.statusCode).toBe(200);
    expect(resp01.body).toEqual(tipoVenda);
    // Id Inválido
    expect(resp02.statusCode).toBe(404);
  });

  test("Inserir um Tipo de Venda", async () => {
    const resp = await request
      .post("/tipos-vendas")
      .send({ descricao: "Outro" });

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ descricao: "Outro", id: 99 });
  });

  test("Atualizar um Tipo de Venda", async () => {
    const resp01 = await request
      .put("/tipos-vendas/1")
      .send({ descricao: "Bebidas Alcoólicas" });
    const resp02 = await request.put("/tipos-vendas/99");

    // ID VÁLIDO
    expect(resp01.statusCode).toBe(200);
    expect(resp01.body).toEqual({ id: 1, descricao: "Bebidas Alcoólicas" });

    // ID INVÁLIDO
    expect(resp02.statusCode).toBe(404);
  });

  test("Apagar um Tipo de Venda", async () => {
    const resp01 = await request.delete("/tipos-vendas/1");
    const resp02 = await request.delete("/tipos-vendas/99");

    // ID VÁLIDO
    expect(resp01.statusCode).toBe(204);
    // ID INVÁLIDO
    expect(resp02.statusCode).toBe(404);
  });
});
