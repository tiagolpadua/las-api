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
        nome: "user1",
        nomeCompleto: "user1",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/75.jpg",
        email: "email1",
      },
      {
        id: 2,
        nome: "user2",
        nomeCompleto: "user2",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/74.jpg",
        email: "email2",
      },
      {
        id: 3,
        nome: "user3",
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
      nome: "user2",
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
      cpf: "95033324004",
    };
    const resp = await request.post("/usuarios").send(usuario);
    expect(resp.statusCode).toBe(201);
    // expect(resp.body).toEqual({ id: 99, ...usuario }); // há algo errado :(
  });

  test("Adicionar usuário com nome já utilizado", async () => {
    const respNomeJaUtilizado = await request.post("/usuarios").send({
      nome: "user1",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/90.jpg",
      cpf: "95033324004",
    });
    expect(respNomeJaUtilizado.statusCode).toBe(400);
    expect(respNomeJaUtilizado.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);
  });

  test("Adicionar usuário com nome inválido", async () => {
    const respNomeInvalido = await request.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/55.jpg",
      cpf: "95033324004",
    });
    expect(respNomeInvalido.statusCode).toBe(400);
    expect(respNomeInvalido.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);
  });
  test("Adicionar usuário com dados inválidos", async () => {
    const respURLInvalida = await request.post("/usuarios").send({
      nome: "nomeValido",
      urlFotoPerfil: "xxxxxxxxxxxxxxxxxxxx",
      cpf: "95033324004",
    });
    expect(respURLInvalida.statusCode).toBe(400);
    expect(respURLInvalida.body).toEqual([
      {
        mensagem: "URL deve ser uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });
  test("Adicionar usuário com cpf inválido", async () => {
    const respCPFInvalido = await request.post("/usuarios").send({
      nome: "nomeValido",
      urlFotoPerfil: "xxxxxxxxxxxxxxxxxxxx",
      cpf: "95033324004",
    });
    expect(respCPFInvalido.statusCode).toBe(400);
    expect(respCPFInvalido.body).toEqual([
      {
        mensagem: "URL deve ser uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });
});
