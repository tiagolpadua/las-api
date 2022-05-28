const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());
jest.mock("../src/repositorios/evento");

describe("API de Eventos", () => {

  //ok
  test("Listar Eventos",async () => {
    const resp = await request.get("/eventos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        "id": 1,
        "nome": "Carnaval",
        "descricao": "Melhor festa do Mundo",
        "urlFoto": "https://randomuser.me/api/portraits/women/55.jpg",
        "dataInicio": "2022-05-29",
        "dataFim": "2022-05-30",
        "status": "agendado"
    },
    {
        "id": 2,
        "nome": "Sao Joao",
        "descricao": "Melhor festa do Mundo",
        "urlFoto": "https://randomuser.me/api/portraits/women/55.jpg",
        "dataInicio": "2022-05-29",
        "dataFim": "2022-08-29",
        "status": "em-andamento"
    },
    {
        "id": 3,
        "nome": "Show da Virada",
        "descricao": "Melhor festa do Mundo",
        "urlFoto": "https://randomuser.me/api/portraits/women/55.jpg",
        "dataInicio": "2022-02-25",
        "dataFim": "2022-04-29",
        "status": "finalizado"
    }
    ]);
  });

  //ok
  test("Listar Eventos pelo ID Existente",async () => {
    const resp = await request.get("/eventos/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "id": 1,
      "nome": "Carnaval",
      "descricao": "Melhor festa do Mundo",
      "urlFoto": "https://randomuser.me/api/portraits/women/55.jpg",
      "dataInicio": "2022-05-29",
      "dataFim": "2022-05-30",
      "status": "agendado"
  });
  });

  //ok
  test("Listar Eventos pelo ID Inexistente",async () => {
    const resp = await request.get("/eventos/15");
    expect(resp.statusCode).toBe(404);
  });

   
  //ok
  test("Adicionar Eventos com dados Validos",async () => {
  const resp = await request.post("/eventos").send(
  {
    "nome": "Balada",
    "descricao": "Melhor Balada do Mundo",
    "urlFoto": "https://randomuser.me/api/portraits/women/55.jpg",
    "dataInicio": "2022-05-29",
    "dataFim": "2022-05-30",
    "status": "agendado"
  });
  expect(resp.statusCode).toBe(200);
  expect(resp.body).toEqual(
    {
      "nome": "Balada",
      "descricao": "Melhor Balada do Mundo",
      "urlFoto": "https://randomuser.me/api/portraits/women/55.jpg",
      "dataInicio": "2022-05-29",
      "dataFim": "2022-05-30",
      "status": "agendado"
    });
  });
   
  //ok
  test("Alterar Eventos",async () => {
    const resp = await request.put("/eventos/2").send({
        "nome": "Sao JOao",
        "descricao": "Melhor festa do Mundo",
        "urlFoto": "https://randomuser.me/api/portraits/women/55.jpg",
        "dataInicio": "2022-05-29",
        "dataFim": "2022-08-29",
        "status": "em-andamento"
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "id": 2,
      "nome": "Sao JOao",
      "descricao": "Melhor festa do Mundo",
      "urlFoto": "https://randomuser.me/api/portraits/women/55.jpg",
      "dataInicio": "2022-05-29",
      "dataFim": "2022-08-29",
      "status": "em-andamento"
    });
  });
   
  test("Excluir Eventos",async () => {
    const resp = await request.delete("/eventos/3");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "id": 3
    });
  });
  
  test("Listar Eventos pelo Status",async () => {
    const respAgendado = await request.get("/eventos/status/agendado");
    const respEmAndamento = await request.get("/eventos/status/em-andamento");
    const respFinalizado = await request.get("/eventos/status/finalizado");
    expect(respAgendado.statusCode).toBe(200);
    expect(respAgendado.body).toEqual([
      {
          "id": 1,
          "nome": "Carnaval",
          "descricao": "Melhor festa do Mundo",
          "urlFoto": "https://randomuser.me/api/portraits/women/55.jpg",
          "dataInicio": "2022-05-29",
          "dataFim": "2022-05-30",
          "status": "agendado"
      }]);

    expect(respEmAndamento.statusCode).toBe(200);
    expect(respEmAndamento.body).toEqual([{
      "id": 2,
      "nome": "Sao Joao",
      "descricao": "Melhor festa do Mundo",
      "urlFoto": "https://randomuser.me/api/portraits/women/55.jpg",
      "dataInicio": "2022-05-29",
      "dataFim": "2022-08-29",
      "status": "em-andamento"
    }]);

    expect(respFinalizado.statusCode).toBe(200);
    expect(respFinalizado.body).toEqual([{
      "id": 3,
      "nome": "Show da Virada",
      "descricao": "Melhor festa do Mundo",
      "urlFoto": "https://randomuser.me/api/portraits/women/55.jpg",
      "dataInicio": "2022-02-25",
      "dataFim": "2022-04-29",
      "status": "finalizado"
    }]);
  });
});

