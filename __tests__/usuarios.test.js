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

  test("Adicionar usuário com Dados inválidos", async () => {
    const respNomeJaUtilizado = await request.post("/usuarios").send({
      nome: "Welbert Araujo",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/22.jpg",
    });
    expect(respNomeJaUtilizado.statusCode).toBe(400);
    expect(respNomeJaUtilizado.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);

    const respNomeInvalido = await request.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/22.jpg",
    });
    expect(respNomeInvalido.statusCode).toBe(400);
    expect(respNomeInvalido.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);

    const respUrlInvalida = await request.post("/usuarios").send({
      nome: "Marcos",
      urlFotoPerfil: "xxxxxts/mxxxexn/xx2x2.xxjpxxxxg",
    });
    expect(respUrlInvalida.statusCode).toBe(400);
    expect(respUrlInvalida.body).toEqual([
      {
        mensagem: "URL deve ser uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });

  test("Alterar dados com dados Válidos", async () => {
    const resp = await request.put("/usuarios/1").send({
      nome: "Welbert Henrique Araujo",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/22.jpg",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      nome: "Welbert Henrique Araujo",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/22.jpg",
    });
  });

  test("Buscar usuário valido por nome", async () => {
    const resp = await request.get("/usuarios/nome/Welbert Araujo");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      nome: "Welbert Araujo",
      urlFotoPerfil: "https://avatars.githubusercontent.com/u/32554572",
    });
  });

  //############### PAREI AQUI EM BUSCAR USUARIO INEXISTENTE POR NOME ###################################
  test("Buscar usuário inexistente por nome", async () => {
    const resp = await request.get("/usuarios/nome/Mary");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual("");
  });

  test("Excluir usuário existente", async () => {
    const resp = await request.delete("/usuarios/4");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ id: 4 });
  });
});

//######################### API DE DADOS PESSOAIS #########################

describe("API de Dados Pesosais do Usuário", () => {
  test("Buscar dados pessoais do usuarios", async () => {
    const resp = await request.get("/usuarios/1/dados-pessoais");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: "1",
      nomeCompleto: "Welbert Henrique Santana Araújo",
      dataNascimento: "1995-05-28",
      rg: "1144455533 SSP BA",
      cpf: "12312312312",
    });
  });

  test("Buscar dados pessoais do usuarios por id inexistente", async () => {
    const resp = await request.get("/usuarios/999/dados-pessoais");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([]);
  });

  test("Alterar dados pessoais com dados Válidos", async () => {
    const resp = await request.put("/usuarios/2/dados-pessoais").send({
      nomeCompleto: "Malcolm Viana",
      dataNascimento: "1995-10-10",
      rg: "1144455533 SSP BA",
      cpf: "12312312312",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 2,
      nomeCompleto: "Malcolm Viana",
      dataNascimento: "1995-10-10",
      rg: "1144455533 SSP BA",
      cpf: "12312312312",
    });
  });
});
