const supertest = require("supertest");
const customExpress = require("../config/customExpress");

const request = supertest(customExpress());

jest.mock("../repositorios/usuario");

const novoUsuario = {
  id: 4,
  nome: "Júlia",
  urlFotoPerfil: "https://randomuser.me/api/portraits/women/35.jpg",
};

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

  test("Deve retornar sucesso quando usuário for válido", async () => {
    const resp = await request.post("/usuarios").send(novoUsuario);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toHaveProperty("id");
  });

  test("Deve retornar erro quando o usuário for inválido", async () => {
    const res = await request.post("/usuarios").send({
      urlFotoPerfil: "url inválida",
      nome: "Renata",
    });
    expect(res.statusCode).toBe(406);
    expect(res.body.error.message).toBe("Usuário inválido");
  });
});
