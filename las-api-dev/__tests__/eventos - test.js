const supertest = require("supertest");
const app = require("../../src/config/customExpress");
const request = supertest(app());
const eventosMock = require("../../mocks/eventos.json");
const novoEvento = require("../../mocks/novoEvento.json");
const eventoAdicionado = require("../../mocks/eventoAdicionado.json");

jest.mock("../../src/repositorios/eventos");

describe("testa GET /eventos", () => {
  it("Página Inicial", async () => {
    const resp = await request.get("/");
    expect(resp.statusCode).toBe(200);
  });

  it("Deve retornar lista com eventos", async () => {
    const resp = await request.get("/eventos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(eventosMock);
  });

  it("Deve retornar evento pelo ID", async () => {
    const resp = await request.get("/eventos/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(eventosMock[0]);
  });

  it("Não deve retornar evento por um ID inexistente", async () => {
    const resp = await request.get("/eventos/9999");
    expect(resp.statusCode).toBe(500);
  });

  it("Deve retornar evento pelo Status agendado ", async () => {
    const resp = await request.get("/eventos/status/agendado");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(eventosMock[0]);
  });

  it("Deve retornar evento pelo Status em-andamento ", async () => {
    const resp = await request.get("/eventos/status/em-andamento");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(eventosMock[1]);
  });

  it("Deve retornar evento pelo Status agendado ", async () => {
    const resp = await request.get("/eventos/status/finalizado");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(eventosMock[2]);
  });

  it("Não deve retornar evento com Status invalido ", async () => {
    const resp = await request.get("/eventos/status/foo");
    expect(resp.statusCode).toBe(500);
  });
});

describe("Testa POST /eventos", () => {
  const eventoValido = novoEvento;
  it("Cria evento válido com sucesso", async () => {
    const resp = await request.post("/eventos").send(eventoValido);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual(eventoAdicionado);
  });

  it("Nao cria evento com data inicio > data fim", async () => {
    let eventoInvalido = novoEvento;
    eventoInvalido.dataInicio = "2020-10-10";
    eventoInvalido.dataFim = "2020-09-10";
    const resp = await request.post("/eventos").send(eventoInvalido);
    expect(resp.statusCode).toBe(500);
  });
});

describe("testa /PUT eventos", () => {
  it("Deve alterar evento pelo ID valido ", async () => {
    const alteracoes = { descricao: "um novo ano que se inicia" };
    const resp = await request.put("/eventos/1").send(alteracoes);
    expect(resp.statusCode).toBe(204);
  });
});

describe("testa /DELETE eventos", () => {
  it("Deve alterar evento pelo ID valido ", async () => {
    const resp = await request.delete("/eventos/1");
    expect(resp.statusCode).toBe(204);
  });
});
