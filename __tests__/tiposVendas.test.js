const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/tiposVendas");

describe("Testes API de Vendas", () => {
  test("Listar vendas", async () => {
    const res = await request.get("/tipos-vendas");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
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
  test("Buscar tipo venda por id", async () => {
    const resp = await request.get("/tipos-vendas/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      descricao: "Bebidas",
    });
  });
  test("Buscar tipo de venda inexistente", async () => {
    const resp = await request.get("/tipos-vendas/2022");
    expect(resp.statusCode).toBe(400);
  });
  test("Adicionar tipo venda", async () => {
    const resp = await request.post("/tipos-vendas").send({
      descricao: "Limpeza",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      descricao: "Limpeza",
      id: 99,
    });
  });

  test("Adicionar tipo venda inválida", async () => {
    const resp = await request.post("/tipos-vendas").send({
      descricao: "ivns",
    });
    expect(resp.statusCode).toBe(404);
  });

  test("Alterar Venda", async () => {
    const res = await request.put("/tipos-vendas/2").send({
      descricao: "novo tipo venda",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      descricao: "novo tipo venda",
    });
  });

  test("Excluir Tipo de venda", async () => {
    const resp = await request.delete("/tipos-vendas/3");
    expect(resp.statusCode).toBe(200);
  });
});
