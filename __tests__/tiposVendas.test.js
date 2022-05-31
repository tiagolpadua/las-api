const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/tiposVendas");

describe("API de tipos de venda", () => {
  //GET listar os tipos de venda
  test("Listar tipos de venda", async () => {
    const resp = await request.get("/tipos-venda");
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
        descricao: "Abadá/Ingressos",
      },
    ]);
  });

  //GET tipos de venda por id
  test("Buscar tipos de venda por um id existente", async () => {
    const resp = await request.get("/tipos-venda/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      descricao: "Bebidas",
    });
  });

  test("Buscar tipos de venda por um id inexistente", async () => {
    const resp = await request.get("/tipos-venda/9999");
    expect(resp.statusCode).toBe(404);
  });

  //POST incluir tipo de venda
  test("Adicionar tipo de venda com dados válidos", async () => {
    const resp = await request.post("/tipos-venda").send({
      id: 3,
      descricao: "Abadá/Ingressos",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      id: 3,
      descricao: "Abadá/Ingressos",
    });
  });

  //PUT alterar tipos de venda
  test("Alterar tipo de venda com dados válidos", async () => {
    const resp = await request.put("/tipos-venda/1").send({
      descricao: "Diversos",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      resultado: "Alteração feita com sucesso",
    });
  });

  //DELETE exluir tipo de venda
  test("Excluir tipo de venda", async () => {
    const resp = await request.delete("/tipos-venda/1");
    expect(resp.statusCode).toBe(204);
    expect(resp.body).toEqual({});
  });
});
