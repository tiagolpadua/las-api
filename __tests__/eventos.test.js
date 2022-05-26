const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/eventos.js");
describe("API Eventos", () => {
  test("Listar Eventos", async () => {
    const res = await request.get("/eventos");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        nome: "evento1",
        descricao: "primeiro evento",
        urlFoto: null,
        dataInicio: "24/05/2022",
        dataFim: "225/05/2022",
        status: null,
      },
      {
        id: 2,
        nome: "evento2",
        descricao: "segundo evento",
        urlFoto: null,
        dataInicio: "22/05/2022",
        dataFim: "23/05/2022",
        status: null,
      },
      {
        id: 3,
        nome: "lucas lucas",
        descricao: "5252525252",
        urlFoto: null,
        dataInicio: "22/05/2022",
        dataFim: "23/05/2022",
        status: null,
      },
    ]);
  });

  test("Adicionar Evento", async () => {
    const res = await request.post("/Eventos").send({ descricao: "bebida" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual([
      {
        id: 1,
        nome: "evento1",
        descricao: "primeiro evento",
        urlFoto: null,
        dataInicio: "24/05/2022",
        dataFim: "225/05/2022",
        status: null,
      },
    ]);
  });

  test("Alterar Evento Existente", async () => {
    const res = await request.put("/Eventos/2").send({ descricao: "alterada" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 2, nome: "evento alterado" }]);
  });

  test("Alterar Evento Inexistente", async () => {
    const res = await request
      .put("/Eventos/99")
      .send({ descricao: "alterada" });
    expect(res.statusCode).toBe(404);
  });

  test("Apagar Evento Existente", async () => {
    const res = await request
      .delete("/Eventos/3")
      .send({ descricao: "alterada" });
    expect(res.statusCode).toBe(204);
  });
  test("Apagar Evento Inexistente", async () => {
    const res = await request
      .put("/Eventos/99")
      .send({ descricao: "alterada" });
    expect(res.statusCode).toBe(404);
  });

  test("Buscar Evento por Id Existente", async () => {
    const res = await request.get("/Eventos/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 7, descricao: "comida" }]);
  });
  test("Buscar Evento por Id Inexistente", async () => {
    const res = await request.get("/Eventos/99");
    expect(res.statusCode).toBe(404);
  });
});
