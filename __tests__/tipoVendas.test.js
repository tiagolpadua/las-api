const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());
jest.mock("../src/repositorios/tiposVenda");

describe("API de Tipo de vendas", () => {

  //ok
  test("Listar Tipo de vendas",async () => {
      const resp = await request.get("/tipos-vendas");
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual([
          {
              "id": 1,
              "descricao": "bebida"
          },
          {
              "id": 2,
              "descricao": "comida"
          },
          {
              "id": 3,
              "descricao": "brindes"
          }
      ]);
  });

  //ok
  test("Listar Tipo de vendas pelo ID",async () => {
    const resp = await request.get("/tipos-vendas/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "id": 1,
      "descricao": "bebida"
    });
  });

  //ok
  test("Listar Tipo de vendas pelo Id existente",async () => {
      const resp = await request.get("/tipos-vendas/15");
      expect(resp.statusCode).toBe(404);
  });
    
  //ok
  test("Adicionar Tipo de vendas com dados Validos",async () => {
    const resp = await request.post("/tipos-vendas").send(
      {
        "descricao": "Sobremesa"
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        "id": 4,
        "descricao": "Sobremesa"
      });
  });

  //ok
  test("Alterar Tipo de vendas",async () => {
    const resp = await request.put("/tipos-vendas/2").send({
        "descricao": "comidA"
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
        "id": 2,
        "descricao": "comidA"
    });
  });
    
  //ok
  test("Excluir Tipo de vendas",async () => {
    const resp = await request.delete("/tipos-vendas/3");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "id": 3
    });
  });

});
    