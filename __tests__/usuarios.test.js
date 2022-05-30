const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

//######################### TESTES API DE USUÁRIOS #########################
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

  test("Adicionar usuário com nome já utilizado", async () => {
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
  });

  test("Adicionar usuário com nome inválido", async () => {
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
  });
  test("Adicionar usuário com url inválida", async () => {
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

  test("Adicionar usuário com nome e url inválida", async () => {
    const respUrlInvalida = await request.post("/usuarios").send({
      nome: "Welbert Araujo",
      urlFotoPerfil: "xxxxxts/mxxxexn/xx2x2.xxjpxxxxg",
    });
    expect(respUrlInvalida.statusCode).toBe(400);
    expect(respUrlInvalida.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
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

  test("Buscar usuário inexistente por nome", async () => {
    const resp = await request.get("/usuarios/nome/Mary");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual("");
  });

  test("Excluir usuário existente", async () => {
    const resp = await request.delete("/usuarios/4");
    expect(resp.statusCode).toBe(204);
    //expect(resp.body).toEqual({ id: 4 });
    //expect(resp.statusCode).toBe(404);
  });

  test("Deletar Usuários com ID Inexistente", async () => {
    const resp = await request.delete("/usuarios/99");
    expect(resp.statusCode).toBe(404);
  });
});

//######################### TESTES API DE DADOS PESSOAIS #########################

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

//######################### TESTES API DE CONTATOS #########################

describe("API de contatos do Usuário", () => {
  test("Buscar contatos do usuarios", async () => {
    const resp = await request.get("/usuarios/1/contatos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      telefone: "7111111111",
      celular: "71888888888",
      email: "welbert@gmail.com",
    });
  });

  test("Alterar contato de usuário com dados Válidos", async () => {
    const resp = await request.put("/usuarios/1/contatos").send({
      telefone: "7111111112",
      celular: "71888888888",
      email: "welbert@gmail.com",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      telefone: "7111111112",
      celular: "71888888888",
      email: "welbert@gmail.com",
    });
  });

  test("Buscar contatos do usuarios por id inexistente", async () => {
    const resp = await request.get("/usuarios/999/contatos");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([]);
  });
});

//######################### TESTES API DE SENHAS #########################

describe("API de atualização de senhas", () => {
  test("Alterar senha de usuário com id Válidos", async () => {
    const resp = await request.put("/usuarios/1/senha").send({
      senha: "123456",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      status: "senha alterada com sucesso.",
    });
  });
});

//######################### TESTES API DE ENDEREÇO #########################

describe("API de endereço do Usuário", () => {
  test("Buscar endereço do usuarios", async () => {
    const resp = await request.get("/usuarios/1/endereco");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      cep: "72980000",
      endereco: "Rua 123",
      numero: 23,
      complemento: "Apartamento 509",
      bairro: "Zona Norte",
    });
  });

  test("Alterar endereço de usuário com dados Válidos", async () => {
    const resp = await request.put("/usuarios/1/endereco").send({
      cep: "72980000",
      endereco: "Rua 4",
      numero: 23,
      complemento: "Apartamento 630",
      bairro: "Zona Norte",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      cep: "72980000",
      endereco: "Rua 4",
      numero: 23,
      complemento: "Apartamento 630",
      bairro: "Zona Norte",
    });
  });

  test("Buscar endereço de usuário com id inválido", async () => {
    const resp = await request.get("/usuarios/99/endereco");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([]);
  });
});
