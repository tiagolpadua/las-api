const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");
const request = supertest(customExpress());

jest.mock("../src/repositorios/tiposVendas");

describe("API De Tipos de Vendas", () => {
  test("Listar Tipos de Vendas", async () => {
    const resp = await request.get("/tipos-vendas");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      { descricao: "Bebida", id: 1 },
      { descricao: "Alimentação", id: 2 },
      { descricao: "Abadá / Ingressos", id: 3 },
    ]);
  });

  test("Buscar Tipos de vendas por id existente", async () => {
    const resp = await request.get("/tipos-vendas/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      descricao: "Bebida"
    });
  });

  test("Buscar Tipos de vendas por id inexistente", async () => {
    const resp = await request.get("/tipos-vendas/9999");
    expect(resp.statusCode).toBe(404);
    });
   
   });
  