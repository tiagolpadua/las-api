const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");
const request = supertest(customExpress());
const eventoModel = require("../src/models/eventos");

jest.mock("../src/repositorios/eventos");

describe("API De Eventos", () => {
  test("Listar Eventos", async () => {
    const resp = await request.get("/eventos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "Carnaval 2022",
        descricao: "O carnaval mais animado do Brasil",
        urlFoto:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg",
        dataInicio: "2023-05-28T03:00:00.000Z",
        dataFim: "2023-05-30T03:00:00.000Z",
        status: "agendado",
      },
      {
        id: 2,
        nome: "São João 2022",
        descricao: "O São João mais animado do Brasil",
        urlFoto:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg",
        dataInicio: "2022-05-11T03:00:00.000Z",
        dataFim: "2023-05-15T03:00:00.000Z",
        status: "Em andamento",
      },
      {
        id: 3,
        nome: "Rock in Bahia 2022",
        descricao: "Festival de rock mais aguardado do Brasil",
        urlFoto:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg",
        dataInicio: "2022-04-11T03:00:00.000Z",
        dataFim: "2022-04-15T03:00:00.000Z",
        status: "Finalizado",
      },
    ]);
  });

  test("Buscar evento por id existente", async () => {
    const resp = await request.get("/eventos/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      nome: "Carnaval 2022",
      descricao: "O carnaval mais animado do Brasil",
      urlFoto:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg",
      dataInicio: "2023-05-28T03:00:00.000Z",
      dataFim: "2023-05-30T03:00:00.000Z",
      status: "agendado",
    });
  });

  test("Buscar evento por id inexistente", async () => {
    const resp = await request.get("/eventos/9999");
    expect(resp.statusCode).toBe(404);
  });

  test("Buscar evento por status Em Andamento", async () => {
    const resp = await request.get("/eventos/status/em-andamento");
    expect(resp.statusCode).toBe(200);
    expect(resp.body.length).toBe(1);
  });

  test("Buscar evento por status Agendado", async () => {
    const resp = await request.get("/eventos/status/agendado");
    expect(resp.statusCode).toBe(200);
    expect(resp.body.length).toBe(1);
  });

  test("Buscar evento por status Finalizado", async () => {
    const resp = await request.get("/eventos/status/finalizado");
    expect(resp.statusCode).toBe(200);
    expect(resp.body.length).toBe(1);
  });

  test("Buscar evento por status Inválido", async () => {
    const resp = await request.get("/eventos/status/coxinha");
    expect(resp.statusCode).toBe(500);
  });
  test("Valida data: data de início vazia", async () => {
    const resp = eventoModel.isDatasValidas({ dataInicio: "", dataFim: "" });
    expect(resp).toBe(false);
  });

  test("Valida data: data de fim vazia", async () => {
    const resp = eventoModel.isDatasValidas({
      dataInicio: "2023-05-28T03:00:00.000Z",
      dataFim: "",
    });
    expect(resp).toBe(false);
  });

  test("Valida data: data de início no passado", async () => {
    const resp = eventoModel.isDatasValidas({
      dataInicio: "2021-05-28T03:00:00.000Z",
      dataFim: "2021-05-28T03:00:00.000Z",
    });
    expect(resp).toBe(false);
  });

  test("Data válida", async () => {
    const resp = eventoModel.isDatasValidas({
      dataInicio: "2023-05-28T03:00:00.000Z",
      dataFim: "2023-05-29T03:00:00.000Z",
    });
    expect(resp).toBe(true);
  });

  test("Data de fim menor que data de início", async () => {
    const resp = eventoModel.isDatasValidas({"dataInicio":"2021-05-28T03:00:00.000Z","dataFim":"2021-05-20T03:00:00.000Z"});
     expect(resp).toBe(false);
      });

      
  test("Excluir Evento",async () => {
     const resp = await request.delete("/eventos/3");
     expect(resp.statusCode).toBe(200);
     expect(resp.body).toEqual({
            "id": 3
          });
        });

        test("Alterar evento pelo ID valido ", async () => {
          const alteracoes = { descricao: "carnaval meio do ano" };
          const resp = await request.put("/eventos/1").send(alteracoes);
          expect(resp.statusCode).toBe(200);
        });

        test("Não alterar evento com ID invalido ", async () => {
          const alteracoes = { nome: "carnaval Savador" };
          const resp = await request.put("/eventos/99").send(alteracoes);
          expect(resp.statusCode).toBe(200);
        });
      });
