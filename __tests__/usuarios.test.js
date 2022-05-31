const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

describe("API de Usuários", () => {
  test("Listar usuários", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      { 
          "id": 1,
          "nome": "Adriana",
          "urlFotoPerfil": "https://randomuser.me/api/portraits/women/13.jpg" 
      },
      { 
          "id": 2,
          "nome": "Cristian",
          "urlFotoPerfil": "https://randomuser.me/api/portraits/women/25.jpg" 
      }
    ]);
  });

  test("Buscar usuário por id existente", async () => {
    const resp = await request.get("/usuarios/2");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      { 
        "id": 2,
        "nome": "Cristian",
        "urlFotoPerfil": "https://randomuser.me/api/portraits/women/25.jpg" 
      }
    );
  });

  test("Buscar usuário por id inexistente", async () => {
    const resp = await request.get("/usuarios/9999");
    expect(resp.statusCode).toBe(404);
  });

  test("Adicionar usuário com dados válidos", async () => {
    const resp = await request.post("/usuarios").send({
      "nome": "Carvalho",
      "urlFotoPerfil": "https://randomuser.me/api/portraits/women/75.jpg"
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      "id": 99,
      "nome": "Carvalho",
      "urlFotoPerfil": "https://randomuser.me/api/portraits/women/75.jpg"
    });
  });

  test("Adicionar usuário com nome inválido", async () => {
    const respJaUtilizado = await request.post("/usuarios").send({
      nome: "Adriana",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/75.jpg",
    });
    expect(respJaUtilizado.statusCode).toBe(400);
    expect(respJaUtilizado.body).toEqual([{
      "nome": "nome",
      "valido": false,
      "mensagem": "Nome deve ser informado e deve ser único"
    }]);

    const respNomeInvalido = await request.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/75.jpg",
    });
    expect(respNomeInvalido.statusCode).toBe(400);
    expect(respNomeInvalido.body).toEqual([{
      "nome": "nome",
      "valido": false,
      "mensagem": "Nome deve ser informado e deve ser único"
    }]);

    const respURLInvalida = await request.post("/usuarios").send({
      nome: "Antonio",
      urlFotoPerfil: "XXXXX.com/teste"
    });
    expect(respURLInvalida.statusCode).toBe(400);
    expect(respURLInvalida.body).toEqual([{
      "nome": "urlFotoPerfil",
      "valido": false,
      "mensagem": "URL deve uma URL válida"
    }]);
  });

  test("Alterar dados de um usuário", async () => {
    const resp = await request.put("/usuarios/1").send(
      {
        "nome": "Ariadna"
      }
    );
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        "id": 1,
        "nome": "Adriana",
        "urlFotoPerfil": "https://randomuser.me/api/portraits/women/13.jpg"
      }
    );
  });

  test("Excluir dados de um usuário", async () => {
    const resp = await request.delete("/usuarios/1");
    expect(resp.statusCode).toBe(200);
  });

  test("Buscar usuário por nome válido", async () => {
    const resp = await request.get("/usuarios/nome/Adriana");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        "id": 1,
        "nome": "Adriana",
        "urlFotoPerfil": "https://randomuser.me/api/portraits/women/13.jpg"
      }
    );
  });

  test("Listar dados pessoais de um usuário", async () => {
    const resp = await request.get("/usuarios/3/dados-pessoais");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual("");
  });

  test("Alterar senha de um usuario", async () => {
    const resp = await request.put("/usuarios/1/senha").send({
      senha: "@123#"
    });
    expect(resp.statusCode).toBe(204);
    expect(resp.body).toEqual({
      
    });
  });

});