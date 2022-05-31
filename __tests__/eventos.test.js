const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/evento");

describe("API Eventos", () => {
  test("Listar Eventos", async () => {
    const resp = await request.get("/eventos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "Carnaval 2021",
        descricao: "Carnaval de Salvador 2021",
        urlFoto:
          "https://trello.com/1/cards/6270532f00826702fcde8c27/attachments/6270532f00826702fcde8d83/download/image.png",
        dataInicio: "01/05/2022",
        dataFim: "07/05/2022",
        status: null,
      },
      {
        id: 2,
        nome: "Carnasal do nordeste",
        descricao: "Carnaval salvador",
        urlFoto: "https://randomuser.me/api/portraits/men/61.jpg",
        dataInicio: "2022-05-20",
        dataFim: "2022-05-25",
        status: "agendado",
      },
      {
        id: 3,
        nome: "Carnasal do Conquista",
        descricao: "Carnaval vitoria da conquista",
        urlFoto: "https://randomuser.me/api/portraits/men/61.jpg",
        dataInicio: "2022-05-20",
        dataFim: "2022-05-25",
        status: null,
      },
    ]);
  });

  test("Buscar Evento por Status", async () => {
    const resp = await request.get("/eventos/status/agendado");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 2,
      nome: "Carnasal do nordeste",
      descricao: "Carnaval salvador",
      urlFoto: "https://randomuser.me/api/portraits/men/61.jpg",
      dataInicio: "2022-05-20",
      dataFim: "2022-05-25",
      status: "agendado",
    });
  });

  test("Adicionar evento com Dados Válidos", async () => {
    const resp = await request.post("/eventos").send({
      nome: "Carnasal do Conquista 2022",
      descricao: "Carnaval vitoria da conquista",
      urlFoto: "https://randomuser.me/api/portraits/men/61.jpg",
      dataInicio: "2022-05-20",
      dataFim: "2022-05-25",
      status: null,
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      id: 4,
      nome: "Carnasal do Conquista 2022",
      descricao: "Carnaval vitoria da conquista",
      urlFoto: "https://randomuser.me/api/portraits/men/61.jpg",
      dataInicio: "2022-05-20",
      dataFim: "2022-05-25",
      status: null,
    });
  });

  test("Listar evento por Id", async () => {
    const resp = await request.get("/eventos/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      nome: "Carnaval 2021",
      descricao: "Carnaval de Salvador 2021",
      urlFoto:
        "https://trello.com/1/cards/6270532f00826702fcde8c27/attachments/6270532f00826702fcde8d83/download/image.png",
      dataInicio: "01/05/2022",
      dataFim: "07/05/2022",
      status: null,
    });
  });

  test("Alterar evento com dados Válidos", async () => {
    const resp = await request.put("/eventos/1").send({
      nome: "Carnaval 2021",
      descricao: "Carnaval de Salvador 2021",
      urlFoto:
        "https://trello.com/1/cards/6270532f00826702fcde8c27/attachments/6270532f00826702fcde8d83/download/image.png",
      dataInicio: "01/05/2022",
      dataFim: "07/05/2022",
      status: null,
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      nome: "Carnaval 2021",
      descricao: "Carnaval de Salvador 2021",
      urlFoto:
        "https://trello.com/1/cards/6270532f00826702fcde8c27/attachments/6270532f00826702fcde8d83/download/image.png",
      dataInicio: "01/05/2022",
      dataFim: "07/05/2022",
      status: null,
    });
  });

  test("Excluir Evento id existente", async () => {
    const resp = await request.delete("/eventos/1");
    expect(resp.statusCode).toBe(200);
    //expect(resp.body).toEqual({ id: 4 });
    //expect(resp.statusCode).toBe(404);
  });

  test("Deletar Evento com ID Inexistente", async () => {
    const resp = await request.delete("/eventos/99");
    expect(resp.statusCode).toBe(200);
  });
});
