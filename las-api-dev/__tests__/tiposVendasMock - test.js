const supertest = require("supertest");
const app = require("../../src/config/customExpress");
const request = supertest(app());
const tiposVendasMock = require("../../mocks/tiposVendasMock.json");
jest.mock("../../src/repositorios/tiposVendas.js");

describe("testa GET /tipos-vendas", () => {
  it("Deve retornar lista com tipos-vendas", async () => {
    const lista = tiposVendasMock;
    lista.pop();
    const resp = await request.get("/tipos-venda");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(lista);
  });

  it("Deve retornar tipo-venda pelo ID", async () => {
    const resp = await request.get("/tipos-venda/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(tiposVendasMock[0]);
  });

  it("Não deve retornar tipo-venda por um ID inexistente", async () => {
    const resp = await request.get("/tipos-venda/9999");
    expect(resp.statusCode).toBe(500);
  });
});

describe("Testa POST /tipos-venda", () => {
  it("Cria tipo-venda válido com sucesso", async () => {
    const resp = await request
      .post("/tipos-venda")
      .send({ id: 1234, descricao: "ingressos" });
    expect(resp.statusCode).toBe(201);
  });

  it("Nao deve criar tipo-venda com dados Inválidos", async () => {
    const resp = await request.post("/tipos-venda").send("foo");
    expect(resp.statusCode).toBe(500);
  });
});

describe("testa /PUT tipos-venda", () => {
  it("Deve alterar tipo-venda pelo ID Existente ", async () => {
    const alteracoes = {
      id: 12345,
      descricao: "Bebida",
    };
    const resp = await request.put("/tipos-venda/1").send(alteracoes);
    expect(resp.statusCode).toBe(204);
  });

  it("Não deve alterar tipo-venda pelo ID Inexistente ", async () => {
    const resp = await request.put("/tipos-venda/9999").send("foo");
    expect(resp.statusCode).toBe(500);
  });
});

describe("testa /DELETE tipos-venda", () => {
  it("Deve deletar tipos-venda pelo ID Existente ", async () => {
    const resp = await request.delete("/tipos-venda/3");
    expect(resp.statusCode).toBe(204);
  });

  it("Não deve deletar tipos-venda pelo ID Inexistente ", async () => {
    const resp = await request.delete("/tipos-venda/9999");
    expect(resp.statusCode).toBe(500);
  });
});
