const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/eventos");

describe("API de eventos", () => {
  //GET listar os eventos
  test("Listar eventos", async () => {
    const resp = await request.get("/eventos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "São João",
        descricao: "Festa popular - junho",
        urlFoto:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg",
        dataInicio: "2021-04-25T03:04:00.000Z",
        dataFim: "2025-06-24T03:06:00.000Z",
        status: "em-andamento",
      },
      {
        id: 2,
        nome: "São João",
        descricao: "Festa popular - junho",
        urlFoto:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg",
        dataInicio: "2021-05-25T03:06:00.000Z",
        dataFim: "2021-06-24T03:06:00.000Z",
        status: "finalizado",
      },
      {
        id: 3,
        nome: "São João",
        descricao: "Festa popular - junho",
        urlFoto:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg",
        dataInicio: "2021-05-10T03:06:00.000Z",
        dataFim: "2025-06-27T03:06:00.000Z",
        status: "em-andamento",
      },
    ]);
  });

  //GET evento por id
  test("Buscar evento por um id existente", async () => {
    const resp = await request.get("/eventos/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      nome: "São João",
      descricao: "Festa popular - junho",
      urlFoto:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg",
      dataInicio: "2021-04-25T03:04:00.000Z",
      dataFim: "2025-06-24T03:06:00.000Z",
      status: "em-andamento",
    });
  });

  test("Buscar evento por um id inexistente", async () => {
    const resp = await request.get("/eventos/9999");
    expect(resp.statusCode).toBe(404);
  });

  // POST incluir evento
  // test("Adicionar evento com dados válidos", async () => {
  //   const resp = await request.post("/eventos").send({
  //     nome: "São João",
  //     descricao: "Festa popular - junho",
  //     urlFoto:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg",
  //     dataInicio: "2021-04-25",
  //     dataFim: "2025-06-24",
  //   });
  //   expect(resp.statusCode).toBe(201);
  //   expect(resp.body).toEqual({
  //     id: 99,
  //     nome: "São João",
  //     descricao: "Festa popular - junho",
  //     urlFoto:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg",
  //     dataInicio: "2021-04-25",
  //     dataFim: "2025-06-24",
  //   });
  // });

  //PUT alterar evento
  test("Alterar evento com dados válidos", async () => {
    const resp = await request.put("/eventos/1").send({
      descricao: "Festa popular",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      resultado: "Alteração feita com sucesso",
    });
  });

  //DELETE exluir evento
  test("Excluir evento", async () => {
    const resp = await request.delete("/eventos/1");
    expect(resp.statusCode).toBe(204);
    expect(resp.body).toEqual({});
  });
});
