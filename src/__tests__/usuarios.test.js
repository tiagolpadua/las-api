const supertest = require("supertest");
const customExpress = require("../config/customExpress");

const request = supertest(customExpress());

jest.mock("../repositorios/usuario");

describe("API de Usuários", () => {
  test("Listar usuários", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "Joaquina",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/50.jpg",
      },
      {
        id: 2,
        nome: "Fernandina",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/32.jpg",
      },
      {
        id: 3,
        nome: "Clara",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/31.jpg",
      },
    ]);
  });

  test("Buscar usuário por um id existente", async () => {
    const resp = await request.get("/usuarios/2");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 2,
      nome: "Fernandina",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/32.jpg",
    });
  });

  test("Buscar usuário por um id inexistente", async () => {
    const resp = await request.get("/usuarios/9999");
    expect(resp.statusCode).toBe(404);
  });
});
