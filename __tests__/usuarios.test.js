const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");
const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

describe("API de usuário", () => {
  test("Consultar lista de usuários", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "Leonardo",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg"
      },
      {
        id: 2,
        nome: "Pedro",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg"
      },
      {
        id: 3,
        nome: "João Paulo",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg"
      }
    ]);
  });
  test("Consultar usuário por um id existente", async () => {
    const resp = await request.get("/usuarios/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      nome: "Leonardo",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg"
    });
  });

  test("Buscar usuário por um id inexistente", async () => {
    const resp = await request.get("/usuarios/500");
    expect(resp.statusCode).toBe(404);
  });

  test("Inserir usuário com dados inválidos", async () => {
    const resp = await request.post("/usuarios").send({
      nome: "Leonardo",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg"
    });
    expect(resp.statusCode).toBe(400);
    expect(resp.body).toEqual([{ "mensagem": "Nome deve ser informado e deve ser único", "nome": "nome", "valido": false }]);
  });

  test("Inserir usuário com dados válidos", async () => {
    const resp = await request.post("/usuarios").send({
      nome: "Gabriel",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg"
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      id: 99,
      nome: "Gabriel",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg"
    });
  });
  test("Alterar usuário com dados válidos", async () => {
    const resp = await request.put("/usuarios/3").send({
      nome: "Jose silva"
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 3,
      nome: "Jose silva",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg"
    });
  });
  test("Alterar usuário com dados inválidos", async () => {
    const resp = await request.put("/usuarios/3").send({
      nome: "Jose silva"
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 3,
      nome: "Jose silva",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg"
    });
  });
  test("Excluir um usuário", async () => {
    const resp = await request.delete("/usuarios/2");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([{ "id": 1, "nome": "Leonardo", "urlFotoPerfil": "https://randomuser.me/api/portraits/men/71.jpg" }, { "id": 3, "nome": "Jose silva", "urlFotoPerfil": "https://randomuser.me/api/portraits/men/71.jpg" }]);
  });
  test("Consultar usuário por um nome existente", async () => {
    const resp = await request.get("/usuarios/nome/Leonardo");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      nome: "Leonardo",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg"
    });
  });
});