const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/tipoVenda");

describe("API Tipos de Vendas", () => {
  test("Listar Tipos de vendas", async () => {
    const resp = await request.get("/tipos-vendas");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
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
    ]);
  });

  test("Adicionar tipo de vendas com Dados Válidos", async () => {
    const resp = await request.post("/tipos-vendas").send({
      id: 4,
      descricao: "infantil",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      id: 4,
      descricao: "infantil",
    });
  });

  test("Listar tipo de Venda por Id", async () => {
    const resp = await request.get("/tipos-vendas/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      descricao: "Bebidas",
    });
  });

  test("Alterar tipo de venda com dados Válidos", async () => {
    const resp = await request.put("/tipos-vendas/1").send({
      id: 1,
      descricao: "Bebidas sem Alcool",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      descricao: "Bebidas sem Alcool",
    });
  });

  test("Excluir Tipo de venda com id existente", async () => {
    const resp = await request.delete("/tipos-vendas/1");
    expect(resp.statusCode).toBe(200);
    //expect(resp.body).toEqual({ id: 4 });
    //expect(resp.statusCode).toBe(404);
  });

  test("Deletar Tipo de venda com ID Inexistente", async () => {
    const resp = await request.delete("/usuarios/99");
    expect(resp.statusCode).toBe(204);
  });
});
