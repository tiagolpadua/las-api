const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorio/evento");

describe("API Eventos", () => {
  test("Listar Eventos", async () => {
    const resp = await request.get("/eventos");
    const eventos = [
      {
        id: 1,
        nome: "Carnaval 2021",
        descricao: "Carnaval de Salvador 2021",
        urlFoto:
          "https://trello.com/1/cards/6270532f00826702fcde8c27/attachments/6270532f00826702fcde8d83/download/image.png",
        dataInicio: "2022-05-01",
        dataFim: "2022-05-07",
        status: "finalizado",
      },
      {
        id: 2,
        nome: "São João",
        descricao: "São João de Salvador",
        urlFoto:
          "https://trello.com/1/cards/6270532f00826702fcde8c27/attachments/6270532f00826702fcde8d83/download/image.png",
        dataInicio: "2022-06-11",
        dataFim: "2022-06-24",
        status: "agendado",
      },
      {
        id: 3,
        nome: "Festa -o Ano Todo-",
        descricao: "Festa que acontece todos os dias do ano",
        urlFoto: "https://salvador/assets/imgs/festa-ano-todo.png",
        dataInicio: "2022-01-01",
        dataFim: "2022-12-31",
        status: "em-andamento",
      },
    ];
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(eventos);
  });

  test("Buscar Evento por Id", async () => {
    const resp01 = await request.get("/eventos/1");
    const resp02 = await request.get("/eventos/99");
    const resp03 = await request.get("/eventos/xx");
    const evento = {
      id: 1,
      nome: "Carnaval 2021",
      descricao: "Carnaval de Salvador 2021",
      urlFoto:
        "https://trello.com/1/cards/6270532f00826702fcde8c27/attachments/6270532f00826702fcde8d83/download/image.png",
      dataInicio: "2022-05-01",
      dataFim: "2022-05-07",
      status: "finalizado",
    };
    // Id Válido
    expect(resp01.statusCode).toBe(200);
    expect(resp01.body).toEqual(evento);
    // Id Inválido
    expect(resp02.statusCode).toBe(404);
    expect(resp03.statusCode).toBe(500);
  });

  test("Buscar Evento por Status", async () => {
    const resp01 = await request.get("/eventos/status/agendado");
    const resp02 = await request.get("/eventos/status/em-andamento");
    const resp03 = await request.get("/eventos/status/finalizado");
    const resp04 = await request.get("/eventos/status/status-errado");
    const eventosAgendados = [
      {
        id: 2,
        nome: "São João",
        descricao: "São João de Salvador",
        urlFoto:
          "https://trello.com/1/cards/6270532f00826702fcde8c27/attachments/6270532f00826702fcde8d83/download/image.png",
        dataInicio: "2022-06-11",
        dataFim: "2022-06-24",
        status: "agendado",
      },
    ];
    const eventosEmAndamento = [
      {
        id: 3,
        nome: "Festa -o Ano Todo-",
        descricao: "Festa que acontece todos os dias do ano",
        urlFoto: "https://salvador/assets/imgs/festa-ano-todo.png",
        dataInicio: "2022-01-01",
        dataFim: "2022-12-31",
        status: "em-andamento",
      },
    ];
    const eventosFinalizados = [
      {
        id: 1,
        nome: "Carnaval 2021",
        descricao: "Carnaval de Salvador 2021",
        urlFoto:
          "https://trello.com/1/cards/6270532f00826702fcde8c27/attachments/6270532f00826702fcde8d83/download/image.png",
        dataInicio: "2022-05-01",
        dataFim: "2022-05-07",
        status: "finalizado",
      },
    ];

    expect(resp01.statusCode).toBe(200);
    expect(resp01.body).toEqual(eventosAgendados);
    expect(resp02.statusCode).toBe(200);
    expect(resp02.body).toEqual(eventosEmAndamento);
    expect(resp03.statusCode).toBe(200);
    expect(resp03.body).toEqual(eventosFinalizados);

    // Id Inválido
    expect(resp04.statusCode).toBe(404);
  });

  test("Inserir um Evento", async () => {
    const eventoValido = {
      nome: "São João",
      descricao: "São João de Salvador",
      urlFoto:
        "https://trello.com/1/cards/6270532f00826702fcde8c27/attachments/6270532f00826702fcde8d83/download/image.png",
      dataInicio: "2022-06-11",
      dataFim: "2022-06-24",
    };
    const eventoDatasInvalidas = {
      nome: "São João",
      descricao: "São João de Salvador",
      urlFoto:
        "https://trello.com/1/cards/6270532f00826702fcde8c27/attachments/6270532f00826702fcde8d83/download/image.png",
      dataInicio: "2022-06-24",
      dataFim: "2022-06-11",
    };
    const resp01 = await request.post("/eventos").send(eventoValido);
    const resp02 = await request.post("/eventos").send(eventoDatasInvalidas);
    const resp03 = await request.post("/eventos");

    expect(resp01.statusCode).toBe(201);
    expect(resp01.body).toEqual({ id: 99, ...eventoValido });

    expect(resp02.statusCode).toBe(500);
    expect(resp03.statusCode).toBe(500);
  });

  test("Atualizar um Evento", async () => {
    const eventoAtualizado = {
      nome: "Carnaval",
      descricao: "Carnaval de Salvador 2021",
      urlFoto:
        "https://trello.com/1/cards/6270532f00826702fcde8c27/attachments/6270532f00826702fcde8d83/download/image.png",
      dataInicio: "2022-05-01",
      dataFim: "2022-05-07",
    };
    const resp01 = await request.put("/eventos/1").send(eventoAtualizado);
    const resp02 = await request.put("/eventos/99");
    const resp03 = await request.get("/eventos/xx");

    // ID VÁLIDO
    expect(resp01.statusCode).toBe(200);
    expect(resp01.body).toEqual({ id: 1, ...eventoAtualizado });

    // ID INVÁLIDO
    expect(resp02.statusCode).toBe(404);
    expect(resp03.statusCode).toBe(500);
  });

  test("Apagar um Evento", async () => {
    const resp01 = await request.delete("/eventos/1");
    const resp02 = await request.delete("/eventos/99");
    const resp03 = await request.get("/eventos/xx");

    // ID VÁLIDO
    expect(resp01.statusCode).toBe(204);
    // ID INVÁLIDO
    expect(resp02.statusCode).toBe(404);
    expect(resp03.statusCode).toBe(500);
  });
});
