const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/evento");

describe("API de Eventos", () => {
  test("Listar Eventos", async () => {
    const resp = await request.get("/eventos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "Show da Virada",
        descricao: "Melhor virada da bahia",
        urlFoto: "https://randomuser.me/api/portraits/women/63.jpg",
        dataInicio: "2022-05-29",
        dataFim: "2022-05-30",
        status: "agendado",
      },
      {
        id: 2,
        nome: "Sao Joao",
        descricao: "Melhor carnaval de todo brasil",
        urlFoto: "https://randomuser.me/api/portraits/women/63.jpg",
        dataInicio: "2022-05-29",
        dataFim: "2022-08-29",
        status: "em-andamento",
      },
      {
        id: 3,
        nome: "Carnaval",
        descricao: "Melhor carnaval de todo brasil",
        urlFoto: "https://randomuser.me/api/portraits/women/63.jpg",
        dataInicio: "2022-02-29",
        dataFim: "2022-03-30",
        status: "finalizado",
      },
    ]);
  });

  test("Buscar evento por id existente", async () => {
    const resp = await request.get("/eventos/2");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 2,
      nome: "Sao Joao",
      descricao: "Melhor carnaval de todo brasil",
      urlFoto: "https://randomuser.me/api/portraits/women/63.jpg",
      dataInicio: "2022-05-29",
      dataFim: "2022-08-29",
      status: "em-andamento",
    });
  });

  test("Buscar evento por id Inexistente", async () => {
    const resp = await request.get("/eventos/10");
    expect(resp.statusCode).toBe(404);
  });

  test("Adicionar Eventos com dados Validos", async () => {
    const resp = await request.post("/eventos").send({
      nome: "Batekoo",
      descricao: "Melhor festa de todas",
      urlFoto: "https://randomuser.me/api/portraits/women/63.jpg",
      dataInicio: "2022-05-30",
      dataFim: "2022-05-31",
      status: "agendado",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      id: 4,
      nome: "Batekoo",
      descricao: "Melhor festa de todas",
      urlFoto: "https://randomuser.me/api/portraits/women/63.jpg",
      dataInicio: "2022-05-30",
      dataFim: "2022-05-31",
      status: "agendado",
    });
  });

  test("Alterar Eventos", async () => {
    const resp = await request.put("/eventos/2").send({
      nome: "Sao JOAO",
      descricao: "Melhor carnaval de todo brasil",
      urlFoto: "https://randomuser.me/api/portraits/women/63.jpg",
      dataInicio: "2022-05-29",
      dataFim: "2022-08-29",
      status: "em-andamento",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 2,
      nome: "Sao JOAO",
      descricao: "Melhor carnaval de todo brasil",
      urlFoto: "https://randomuser.me/api/portraits/women/63.jpg",
      dataInicio: "2022-05-29",
      dataFim: "2022-08-29",
      status: "em-andamento",
    });
  });

  test("Excluir Eventos", async () => {
    const resp = await request.delete("/eventos/3");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 3,
    });
  });

  test("Listar Eventos pelo Status", async () => {
    const respAgendado = await request.get("/eventos/status/agendado");
    const respEmAndamento = await request.get("/eventos/status/em-andamento");
    const respFinalizado = await request.get("/eventos/status/finalizado");
    expect(respAgendado.statusCode).toBe(200);
    expect(respAgendado.body).toEqual([
      {
        id: 1,
        nome: "Show da Virada",
        descricao: "Melhor virada da bahia",
        urlFoto: "https://randomuser.me/api/portraits/women/63.jpg",
        dataInicio: "2022-05-29",
        dataFim: "2022-05-30",
        status: "agendado",
      },
    ]);
    expect(respEmAndamento.statusCode).toBe(200);
    expect(respEmAndamento.body).toEqual([
      {
        id: 2,
        nome: "Sao Joao",
        descricao: "Melhor carnaval de todo brasil",
        urlFoto: "https://randomuser.me/api/portraits/women/63.jpg",
        dataInicio: "2022-05-29",
        dataFim: "2022-08-29",
        status: "em-andamento",
      },
    ]);
    expect(respFinalizado.statusCode).toBe(200);
    expect(respFinalizado.body).toEqual([
      {
        id: 3,
        nome: "Carnaval",
        descricao: "Melhor carnaval de todo brasil",
        urlFoto: "https://randomuser.me/api/portraits/women/63.jpg",
        dataInicio: "2022-02-29",
        dataFim: "2022-03-30",
        status: "finalizado",
      },
    ]);
  });
});
