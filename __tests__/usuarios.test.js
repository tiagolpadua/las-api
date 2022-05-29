const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

describe("API de Usuários", () => {
  test("Listar Usuários", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "Domingos",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/63.jpg",
      },
      {
        id: 2,
        nome: "Domingosx",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/63.jpg",
      },
      {
        id: 3,
        nome: "Domingosxx",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/63.jpg",
      },
      {
        id: 4,
        nome: "Domingosxxx",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/63.jpg",
      },
      {
        id: 5,
        nome: "Domingosxxxx",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/63.jpg",
      },
      {
        id: 6,
        nome: "Gemini",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/63.jpg",
      },
    ]);
  });

  test("Buscar usuario por id existente", async () => {
    const resp = await request.get("/usuarios/2");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 2,
      nome: "Domingosx",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/63.jpg",
    });
  });

  test("Buscar usuario por id Inexistente", async () => {
    const resp = await request.get("/usuarios/9555");
    expect(resp.statusCode).toBe(404);
  });

  test("Adicionar Usuário com dados válidos", async () => {
    const resp = await request.post("/usuarios").send({
      nome: "Antonio123",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/63.jpg",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      id: 99,
      nome: "Antonio123",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/63.jpg",
    });
  });

  test("Adicionar Usuário com dados Inválidos", async () => {
    const respJaUtilizado = await request.post("/usuarios").send({
      nome: "Domingosxx",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/63.jpg",
    });
    expect(respJaUtilizado.statusCode).toBe(400);
    expect(respJaUtilizado.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);

    const respNomeInvalido = await request.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/63.jpg",
    });
    expect(respNomeInvalido.statusCode).toBe(400);
    expect(respNomeInvalido.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);

    const respURLInvalido = await request.post("/usuarios").send({
      nome: "Keven",
      urlFotoPerfil: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
    });
    expect(respURLInvalido.statusCode).toBe(400);
    expect(respURLInvalido.body).toEqual([
      {
        mensagem: "URL deve uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });
});
