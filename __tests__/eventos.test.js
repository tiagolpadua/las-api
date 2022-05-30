const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");
const request = supertest(customExpress());

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
        dataInicio: "2022-05-28T03:00:00.000Z",
        dataFim: "2022-05-30T03:00:00.000Z",
        status: "agendado",
      },
      {
        id: 2,
        nome: "São João 2022",
        descricao: "O São João mais animado do Brasil",
        urlFoto:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg",
        dataInicio: "2022-05-11T03:00:00.000Z",
        dataFim: "2022-05-15T03:00:00.000Z",
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
      dataInicio: "2022-05-28T03:00:00.000Z",
      dataFim: "2022-05-30T03:00:00.000Z",
      status: "agendado",
    });
  });

  test("Buscar evento por id inexistente", async () => {
    const resp = await request.get("/eventos/9999");
    expect(resp.statusCode).toBe(404);
  });

  test("Buscar evento por status", async () => {
    const resp = await request.get("/eventos/em-andamento");
    expect(resp.statusCode).toBe(200);
});
});