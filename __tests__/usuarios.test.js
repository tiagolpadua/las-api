const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

describe("API de Usuários", () => {
  //GET listar usuários
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

  //GET usuários por id
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

  //POST incluir usuários
  test("Adicionar usuário com dados válidos", async () => {
    const resp = await request.post("/usuarios").send({
      nome: "Júlia",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/35.jpg",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      id: 99,
      nome: "Júlia",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/35.jpg",
    });
  });

  test("Adicionar usuário com dados inválidos", async () => {
    const respJautilizado = await request.post("/usuarios").send({
      nome: "Joaquina",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/50.jpg",
    });
    expect(respJautilizado.statusCode).toBe(400);
    expect(respJautilizado.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);

    const respNomeInvalido = await request.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/35.jpg",
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
      nome: "Júlia",
      urlFotoPerfil: "inválido",
    });
    expect(respUrlInvalida.statusCode).toBe(400);
    expect(respUrlInvalida.body).toEqual([
      {
        mensagem: "URL deve uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });

  //PUT alterar usuários
  test("Alterar usuário com dados válidos", async () => {
    const resp = await request.put("/usuarios/1").send({
      nome: "Bernadete",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/51.jpg",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      resultado: "Alteração feita com sucesso",
    });
  });

  test("Alterar usuário com dados inválidos", async () => {
    const respJautilizado = await request.put("/usuarios/1").send({
      nome: "Fernandina",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/50.jpg",
    });
    expect(respJautilizado.statusCode).toBe(400);
    expect(respJautilizado.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);

    const respNomeInvalido = await request.put("/usuarios/1").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/35.jpg",
    });
    expect(respNomeInvalido.statusCode).toBe(400);
    expect(respNomeInvalido.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);

    const respUrlInvalida = await request.put("/usuarios/1").send({
      nome: "Júlia",
      urlFotoPerfil: "inválido",
    });
    expect(respUrlInvalida.statusCode).toBe(400);
    expect(respUrlInvalida.body).toEqual([
      {
        mensagem: "URL deve uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });

  //DELETE exluir usuário
  test("Exluir usuário", async () => {
    const resp = await request.delete("/usuarios/1");
    expect(resp.statusCode).toBe(204);
    expect(resp.body).toEqual({});
  });

  //GET buscar por nome
  test("Burcar por nome de usuário", async () => {
    const resp = await request.get("/usuarios/nome/ina");
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
    ]);
  });

  // test("Deve retornar sucesso quando usuário for válido", async () => {
  //   const resp = await request.post("/usuarios").send(novoUsuario);
  //   expect(resp.statusCode).toBe(201);
  //   expect(resp.body).toHaveProperty("id");
  // });

  // test("Deve retornar erro quando o usuário for inválido", async () => {
  //   const res = await request.post("/usuarios").send({
  //     urlFotoPerfil: "url inválida",
  //     nome: "Renata",
  //   });
  //   expect(res.statusCode).toBe(406);
  //   expect(res.body.error.message).toBe("Usuário inválido");
  // });
});

describe("API de dados pessoais", () => {
  //GET listar dados pessoais
  test("Buscar dados pessoais com id existente", async () => {
    const resp = await request.get("/usuarios/1/dados-pessoais");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        nomeCompleto: "Ana Joaquina",
        dataNascimento: "2002-05-02",
        rg: "123456789",
        cpf: "12345678912",
      },
    ]);
  });

  test("Buscar dados pessoais com id inexistente", async () => {
    const resp = await request.get("/usuarios/9999/dados-pessoais");
    expect(resp.statusCode).toBe(404);
  });

  //PUT alterar dados pessoais

  test("Alterar dados pessoais com dados válidos", async () => {
    const resp = await request.put("/usuarios/1/dados-pessoais").send({
      nomeCompleto: "Ana Catarina",
      dataNascimento: "2002-05-02",
      rg: "123456789",
      cpf: "13156182494",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      resultado: "Alteração feita com sucesso",
    });
  });

  test("Alterar dados pessoais com dados inválidos", async () => {
    const resp = await request.put("/usuarios/1/dados-pessoais").send({
      nomeCompleto: "Ana Catarina",
      dataNascimento: "2002-05-02",
      rg: "123456789",
      cpf: "12345678915",
    });
    expect(resp.statusCode).toBe(400);
    expect(resp.body).toEqual([
      {
        nome: "cpf",
        valido: false,
        mensagem: "CPF informado não é válido",
      },
    ]);
  });

  test("Alterar dados pessoais com dados válidos", async () => {
    const resp = await request.put("/usuarios/1/dados-pessoais").send({
      nomeCompleto: "Ana Catarina",
      dataNascimento: "2002-05-02",
      rg: "123456789",
      cpf: "13156182494",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      resultado: "Alteração feita com sucesso",
    });
  });
});

describe("API de contatos", () => {
  //GET listar contatos
  test("Buscar contatos com id existente", async () => {
    const resp = await request.get("/usuarios/1/contatos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        telefone: "71987658248",
        celular: "71965843548",
        email: "nome@email.com.br",
      },
    ]);
  });

  test("Buscar contatos com id inexistente", async () => {
    const resp = await request.get("/usuarios/9999/contatos");
    expect(resp.statusCode).toBe(404);
  });

  //PUT alterar contatos

  test("Alterar contatos com dados válidos", async () => {
    const resp = await request.put("/usuarios/1/contatos").send({
      telefone: "71987658248",
      celular: "71965843548",
      email: "nome@email.com.br",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      resultado: "Alteração feita com sucesso",
    });
  });
});

describe("API de senha", () => {
  //PUT alterar senha
  test("Alterar senha com senha válida", async () => {
    const resp = await request.put("/usuarios/1/senha").send({
      senha: "123456",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      resultado: "Alteração feita com sucesso",
    });
  });
});

describe("API de endereço", () => {
  //GET listar endereço
  test("Buscar endereço com id existente", async () => {
    const resp = await request.get("/usuarios/1/endereco");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        cep: "41280070",
        endereco: "rua de cima",
        numero: 280,
        complemento: "3º andar",
        bairro: "Americanas",
      },
    ]);
  });

  test("Buscar endereço com id inexistente", async () => {
    const resp = await request.get("/usuarios/9999/endereco");
    expect(resp.statusCode).toBe(404);
  });

  //PUT alterar contatos

  test("Alterar endereço com dados válidos", async () => {
    const resp = await request.put("/usuarios/1/endereco").send({
      cep: "41280070",
      endereco: "rua de cima",
      numero: 280,
      complemento: "3º andar",
      bairro: "Americanas",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      resultado: "Alteração feita com sucesso",
    });
  });
});
