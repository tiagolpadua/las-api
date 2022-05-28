const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

describe("API de usuários", () => {
  test("Listar usuarios", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "Welbert Araujo",
        urlFotoPerfil: "https://avatars.githubusercontent.com/u/32554572",
      },
      {
        id: 2,
        nome: "Jessica Laranjeiras",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/22.jpg",
      },
      {
        id: 3,
        nome: "Paulo Francisco",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: 4,
        nome: "Murilo Benicio",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/23.jpg",
      },
    ]);
  });

  test("Buscar usuário por id existente", async () => {
    const resp = await request.get("/usuarios/2");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 2,
      nome: "Jessica Laranjeiras",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/22.jpg",
    });
  });

  test("Buscar usuário por id inexistente", async () => {
    const resp = await request.get("/usuarios/9999");
    expect(resp.statusCode).toBe(404);
  });

  test("Adicionar usuário com Dados Válidos", async () => {
    const resp = await request.post("/usuarios").send({
      nome: "Marcos",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/22.jpg",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      id: 99,
      nome: "Marcos",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/22.jpg",
    });
  });
});

describe("API de Dados Pesosais do Usuário", () => {
  test("Buscar dados pessoais do usuarios", async () => {
    const resp = await request.get("/usuarios/1/dados-pessoais");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      nomeCompleto: "Welbert Henrique Santana Araújo",
      dataNascimento: "1995-05-28",
      rg: "1144455533 SSP BA",
      cpf: "12312312312",
    });
  });
});
