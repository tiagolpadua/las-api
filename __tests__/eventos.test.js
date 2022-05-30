const customExpress = require("../src/config/customExpress");
const supertest = require("supertest");
const request = supertest(customExpress());

jest.mock("../src/repositorios/evento");

describe("API de eventos", () => {
  test("Listar eventos", async () => {
    const resp = await request.get("/eventos");
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual([
        {
          "id": 1,
          "nome": "Carnaval",
          "descricao": "descrição",
          "urlFoto": "https://randomuser.me/api/portraits/women/5.jpg",
          "dataInicio": "2022-09-20T03:00:00.000Z",
          "dataFim": "2022-09-25T03:00:00.000Z",
          "status": "agendado"
        },
        {
          "id": 2,
          "nome": "Micareta",
          "descricao": "descrição",
          "urlFoto": "https://randomuser.me/api/portraits/women/7.jpg",
          "dataInicio": "2022-05-20T03:00:00.000Z",
          "dataFim": "2022-05-25T03:00:00.000Z",
          "status": "finalizado"
        }
    ]);
  });

  test("Buscar evento por ID existente", async () => {
    const resp = await request.get("/eventos/1");
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
        id: 1,
        nome: "Carnaval",
        descricao: "descrição",
        urlFoto: "https://randomuser.me/api/portraits/women/5.jpg",
        dataInicio: "2022-09-20T03:00:00.000Z",
        dataFim: "2022-09-25T03:00:00.000Z",
        status: "agendado"
      });
  });

  test("Buscar evento por ID inexistente", async () => {
    const resp = await request.get("/eventos/100");
    expect(resp.statusCode).toBe(404);
  });

  test("Adicionar evento com dados válidos", async () => {
    const evento = {
      nome: "Micareta",
      descricao: "descrição",
      urlFoto: "https://randomuser.me/api/portraits/women/7.jpg",
      dataInicio: "2022-09-20",
      dataFim: "2022-09-25",
      status: "agendado"
  };
    const resp = await request.post("/eventos").send(evento);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({id: 3, ...evento });
  });

});
