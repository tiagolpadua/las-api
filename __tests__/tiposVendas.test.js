const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/tiposVendas");
describe("API Vendas", () => {
  test("Listar Vendas", async () => {
    const res = await request.get("/tipos-vendas");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      { id: 2, descricao: "alterada" },
      { id: 3, descricao: "bebida" },
      { id: 4, descricao: "bebida" },
      { id: 5, descricao: "comida" },
      { id: 6, descricao: "comida" },
      { id: 7, descricao: "comida" },
    ]);
  });

  test("Adicionar Venda", async () => {
    const res = await request
      .post("/tipos-vendas")
      .send({ descricao: "Outro" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ descricao: "Outro", id: 99 });
  });
  test("Alterar Venda Existente", async () => {
    const res = await request
      .put("/tipos-vendas/2")
      .send({ descricao: "alterada" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 2, descricao: "alterada" });
  });

  test("Alterar Venda Inexistente", async () => {
    const res = await request
      .put("/tipos-vendas/99")
      .send({ descricao: "alterada" });
    expect(res.statusCode).toBe(404);
  });

  test("Apagar Venda Existente", async () => {
    const res = await request
      .delete("/tipos-vendas/4")
      .send({ descricao: "alterada" });
    expect(res.statusCode).toBe(204);
  });
  test("Apagar Venda Inexistente", async () => {
    const res = await request
      .put("/tipos-vendas/99")
      .send({ descricao: "alterada" });
    expect(res.statusCode).toBe(404);
  });

  test("Buscar Venda por Id Existente", async () => {
    const res = await request.get("/tipos-vendas/6");
    // expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 7, descricao: "comida" });
  });
  test("Buscar Venda por Id Inexistente", async () => {
    const res = await request.get("/tipos-vendas/99");
    expect(res.statusCode).toBe(404);
  });
});
