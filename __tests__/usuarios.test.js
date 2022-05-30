const customExpress = require("../src/config/customExpress");
const supertest = require("supertest");
const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

describe("API de usuários", () => {
  test("Listar usuários", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nomeCompleto: "user1",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/75.jpg",
        email: "email1",
      },
      {
        id: 2,
        nomeCompleto: "user2",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/74.jpg",
        email: "email2",
      },
      {
        id: 3,
        nomeCompleto: "user3",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/90.jpg",
        email: "email3",
      },
    ]);
  });
  test("Buscar usuário por ID existente", async () => {
    const resp = await request.get("/usuarios/2");
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      id: 2,
      nomeCompleto: "user2",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/74.jpg",
      email: "email2",
    });
  });
  test("Buscar usuário por ID inexistente", async () => {
    const resp = await request.get("/usuarios/9999");
    expect(resp.statusCode).toBe(404);
  });
  test("Adicionar usuário com dados válidos", async () => {
    const usuario = {
      nome: "NomeNuncaUsado",
      nomeCompleto: "marcos paz",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/90.jpg",
      cpf: "08237242556",
    };
    const resp = await request.post("/usuarios").send(usuario);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ id: 99, ...usuario}); // há algo errado :(
  });
  test("Adicionar usuário com dados inválidos", () => {});
});
