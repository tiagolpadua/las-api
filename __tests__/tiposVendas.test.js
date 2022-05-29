const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/tiposVendas.js");

describe("API de Tipo de vendas", () => {
  test("Listar Tipo de vendas", async () => {
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
        descricao: "Ingresso",
      },
    ]);
  });

  test("Listar Tipo de vendas pelo ID", async () => {
    const resp = await request.get("/tipos-vendas/2");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 2,
      descricao: "Alimentação",
    });
  });

  test("Listar Tipo de vendas pelo Id existente", async () => {
    const resp = await request.get("/tipos-vendas/15");
    expect(resp.statusCode).toBe(404);
  });

  test("Adicionar Tipo de Vendas com Dados validos", async () => {
    const resp = await request.post("/tipos-vendas").send({
      descricao: "Sobremesa",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      id: 4,
      descricao: "Sobremesa",
    });
  });

  test("Adicionar Tipo de Vendas com Dados Invalidos", async () => {
    const resp = await request.post("/tipos-vendas").send({
      id: 4,
      descricao: "min",
    });
    expect(resp.statusCode).toBe(400);
    expect(resp.body).toEqual([
      {
        mensagem:
          "Uma descrição deve ser informada, e possuir no mínimo 5 caracteres",
        nome: "descricao",
        valido: false,
      },
    ]);
  });

  test("Alterar Tipo de vendas", async () => {
    const resp = await request.put("/tipos-vendas/2").send({
        "descricao": "alimentação"
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
        "id": 2,
       "descricao": "alimentação"
      });
  });

  test("Excluir Tipo de vendas",async () => {
    const resp = await request.delete("/tipos-vendas/3");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "id": 3
    });
  });
});
