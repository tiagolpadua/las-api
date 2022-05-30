const customExpress = require("../src/config/customExpress");
const supertest = require("supertest");
const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

describe("API de usuários", () => {
  test("Listar usuários", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
          "id": 1,
          "nomeCompleto": "user1",
          "urlFotoPerfil": "https://randomuser.me/api/portraits/women/75.jpg"
      },
      {
          "id": 2,
          "nomeCompleto": "user2",
          "urlFotoPerfil": "https://randomuser.me/api/portraits/women/74.jpg"
      },
      {
          "id":3,
          "nomeCompleto": "user3",
          "urlFotoPerfil": "https://randomuser.me/api/portraits/women/90.jpg"
      }
  ]);
  });
});
