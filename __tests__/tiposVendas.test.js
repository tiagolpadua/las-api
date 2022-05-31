const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/tiposVendas");

describe("API de Tipos de Vendas", () => {
  test("Listar Tipos de Vendas", async () => {
    const resp = await request.get("/tipos-venda");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {"descricao": "Bebidas", "id": 1},
      {"descricao": "Alimentação", "id": 2}, 
      {"descricao": "Abadá / Ingressos", "id": 3}
    ]);
  });

  test("Buscar Tipo de Venda por id existente", async () => {
    const resp = await request.get("/tipos-venda/2");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "id": 2,
      "descricao": "Alimentação"
    });
  });

  test("Buscar Tipo de Venda por id inexistente", async () => {
    const resp = await request.get("/tipos-venda/999");
    expect(resp.statusCode).toBe(404);
  });

  test("Adicionar Tipo de Venda com Dados Válidos", async () => {
    const resp = await request.post("/tipos-venda").send({
      id: 99,
      descricao: "Cinema"
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      descricao: "Cinema",
      id: 99,
    });
  });

  test("Adicionar Tipo de Venda com Dados Inválidos", async () => {
    const resp = await request.post("/tipos-venda").send({
      id: 1111,
      descricao: "",
    });
    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual({"erroApp": [
      { 
        mensagem: "Descrição deve ser informada e deve ser única",
        nome: "descricao",
        valido: false,
      }
    ]});
  });

  test("Atualizar Tipo de Venda com id existente", async () => {
    const resp = await request.put("/tipos-venda/1").send(
      {
        id: 1,
        descricao: "Bebidas"
      }
    );
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        id: 1,
        descricao: "Bebidas"
      }
    );
  });

  test("Atualizar Tipo de Venda com id inexistente", async () => {
    const resp = await request.put("/tipos-venda/9999").send(
      {
        id: 999,
        descricao: "Ingresso NBA"
      }
    );
    expect(resp.statusCode).toBe(404);
  });
  
  test("Deletar Tipo de Venda com id existente", async () => {
    const resp = await request.delete("/tipos-venda/1");
    expect(resp.statusCode).toBe(204);
  });

  test("Deletar Tipo de Venda com id inexistente", async () => {
    const resp = await request.delete("/tipos-venda/999");
    expect(resp.statusCode).toBe(404);
  });

});