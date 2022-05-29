const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());
jest.mock("../src/repositorios/eventos");

describe("API eventos", () => {
  test("Listar Eventos", async () => {
    const resp = await request.get("/eventos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "Lavagem do Bonfim",
        descricao: "Festa do Bonfim",
        urlFoto: "https://randomuser.me/api/portraits/men/91.jpg",
      },
      {
        id: 2,
        nome: "Carnaval",
        descricao: "Carnaval",
        urlFoto: "https://randomuser.me/api/portraits/men/91.jpg",
      },
    ]);
  });

  test("Buscar evento por id existente", async () => {
    const respBuscar = await request.get("/eventos/1");
    expect(respBuscar.statusCode).toBe(200);
    expect(respBuscar.body).toEqual({
      id: 1,
      nome: "Lavagem do Bonfim",
      descricao: "Festa do Bonfim",
      urlFoto: "https://randomuser.me/api/portraits/men/91.jpg",
    });
  });

  test("Buscar evento por id inexistente", async () => {
    const resp = await request.get("/eventos/11");
    expect(resp.statusCode).toBe(404);
  });

  test("Adicionar evento valido", async () => {
    const respAdicionar = await request.post("/eventos").send({
      nome: "Festa de Yemanjá",
      descricao: "2 de Fevereiro",
      urlFoto: "https://randomuser.me/api/portraits/men/77.jpg",
      dataInicio: "2022-01-01",
      dataFim: "2022-02-02",
      status: "finalizado",
    });
    expect(respAdicionar.statusCode).toBe(201);
  });
  test("Alterar evento por id existente", async () => {
    const respAlterar = await request.put("/eventos/1");
    expect(respAlterar.statusCode).toBe(201);
  });

  test("Deletar evento por id existente", async () => {
    const respDeletar = await request.delete("/eventos/2");
    expect(respDeletar.statusCode).toBe(201);
  });
  test("Buscar evento por nome existente", async () => {
    const resp = await request.get("/eventos/nome/Carnaval");
    expect(resp.statusCode).toBe(200);
  });
  test("Buscar evento por status", async () => {
    const resp = await request.get("/eventos/status/finalizado");
    expect(resp.statusCode).toBe(200);
  });
});
