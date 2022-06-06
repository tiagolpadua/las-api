const req = require("express/lib/request");
const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/eventos");

describe("Testes API Eventos", () => {
  test("Listar Eventos", async () => {
    const res = await request.get("/eventos");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        nome: "São Pedro",
        descricao: "Festa que sucede o são joão",
        urlFoto: null,
        dataInicio: "2022-06-29",
        dataFim: "2022-06-30",
        status: "agendado",
      },
      {
        id: 2,
        nome: "Carnaval",
        descricao: "7 dias de festa em salvador",
        urlFoto: null,
        dataInicio: "2022-02-28",
        dataFim: "2022-03-03",
        status: "finalizado",
      },
      {
        id: 3,
        nome: "São João",
        descricao: "Maior festa nordestina do ano",
        urlFoto: null,
        dataInicio: "2022-06-01",
        dataFim: "2022-06-28",
        status: "em-andamento",
      },
    ]);
  });
  test("Buscar eventos por id", async () => {
    const res = await request.get("/eventos/2");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      nome: "Carnaval",
      descricao: "7 dias de festa em salvador",
      urlFoto: null,
      dataInicio: "2022-02-28",
      dataFim: "2022-03-03",
      status: "finalizado",
    });
  });
  test("Buscar um evento por id inválido", async () => {
    const res = await request.get("/eventos/99");
    expect(res.statusCode).toBe(400);
  });

  test("Adicionar um evento", async () => {
    const res = await request.post("/eventos").send({
      id: 23,
      nome: "evento teste",
      descricao: "Evento fictício para teste",
      urlFoto: null,
      dataInicio: "28/06/2022",
      dataFim: "29/06/2022",
      status: "agendado",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 23,
      nome: "evento teste",
      descricao: "Evento fictício para teste",
      urlFoto: null,
      dataInicio: "28/06/2022",
      dataFim: "29/06/2022",
      status: "agendado",
    });
  });
  test("Alterar Evento Existente", async () => {
    const resp01 = await request.put("/eventos/1").send({
      id: 1,
      nome: "São Pedro",
      descricao: "Festa que sucede o são joão",
      urlFoto: null,
      dataInicio: "2022-06-29",
      dataFim: "2022-06-30",
      status: "agendado",
    });
    expect(resp01.statusCode).toBe(200);
    expect(resp01.body).toEqual({
      id: 1,
      nome: "São Pedro",
      descricao: "Festa que sucede o são joão",
      urlFoto: null,
      dataInicio: "2022-06-29",
      dataFim: "2022-06-30",
      status: "agendado",
    });
  });
  test("Alterar um evento inválido", async () => {
    const res = await request.put("/eventos/999");
    expect(res.statusCode).toBe(404);
  });
  test("Excluir evento", async () => {
    const resp = await request.delete("/eventos/1");
    expect(resp.statusCode).toBe(200);
  });
  test("Excluir um evento inválido", async () => {
    const res = await request.delete("/eventos/999");
    expect(res.statusCode).toBe(400);
  });
  test("Buscar Evento por Status Agendado", async () => {
    const res = await request.get("/eventos/status/agendado");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        nome: "São Pedro",
        descricao: "Festa que sucede o são joão",
        urlFoto: null,
        dataInicio: "2022-06-29",
        dataFim: "2022-06-30",
        status: "agendado",
      },
    ]);
  });
  test("Buscar Evento por Status Em Andamento", async () => {
    const res = await request.get("/eventos/status/em-andamento");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        id: 3,
        nome: "São João",
        descricao: "Maior festa nordestina do ano",
        urlFoto: null,
        dataInicio: "2022-06-01",
        dataFim: "2022-06-28",
        status: "em-andamento",
      },
    ]);
  });
  test("Buscar Evento por Status Finalizado", async () => {
    const res = await request.get("/eventos/status/finalizado");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        id: 2,
        nome: "Carnaval",
        descricao: "7 dias de festa em salvador",
        urlFoto: null,
        dataInicio: "2022-02-28",
        dataFim: "2022-03-03",
        status: "finalizado",
      },
    ]);
  });
});
