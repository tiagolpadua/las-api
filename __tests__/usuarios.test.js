const customExpress = require("../src/config/customExpress");
const supertest = require("supertest");
const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

describe("API de usuários", () => {
  test("Listar usuários", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toStrictEqual([
      {
          "nomeCompleto": "user1",
          "urlFotoPerfil": "https://randomuser.me/api/portraits/women/75.jpg",
          "email": "email1"
      },
      {
          "nomeCompleto": "user2",
          "urlFotoPerfil": "https://randomuser.me/api/portraits/women/74.jpg",
          "email": "email2"
      },
      {
          "nomeCompleto": "user3",
          "urlFotoPerfil": "https://randomuser.me/api/portraits/women/90.jpg",
          "email": "email3"
      }
  ]);
  });
});
