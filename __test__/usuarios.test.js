const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorio/usuario");
describe("API de Usuários", () => {
  test("Listar Usuários", async () => {
    const resp = await request.get("/usuarios");
    const listaUsuarios = [
      {
        id: 1,
        nome: "Tainah Carvalho",
        urlFotoPerfil: "https://avatars.githubusercontent.com/u/83484176?v=4",
      },
      {
        id: 2,
        nome: "Mauricio Menezes",
        urlFotoPerfil: "https://avatars.githubusercontent.com/u/20570844?v=4",
      },
      {
        id: 3,
        nome: "Aleatório da Silva",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/16.jpg",
      },
    ];

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(listaUsuarios);
  });
  test("Buscar Usuários por Id Existente", async () => {
    const resp = await request.get("/usuarios/3");
    const usuario = {
      id: 3,
      nome: "Aleatório da Silva",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/16.jpg",
    };

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(usuario);
  });
  test("Buscar Usuários por Id Inexistente", async () => {
    const resp = await request.get("/usuarios/999");

    expect(resp.statusCode).toBe(404);
  });
  test("Inserir um Usuário com os Dados Válidos", async () => {
    const usuario = {
      nome: "Vulgo de Oliveira",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/36.jpg",
    };
    const resp = await request.post("/usuarios").send(usuario);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ id: 99, ...usuario });
  });
  test("Inserir um Usuário com Nome Existente", async () => {
    const usuario = {
      nome: "Aleatório da Silva",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/36.jpg",
    };
    const resp = await request.post("/usuarios").send(usuario);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);
  });
  test("Inserir um Usuário com o Nome Inválido", async () => {
    const usuario = {
      nome: "",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/36.jpg",
    };
    const resp = await request.post("/usuarios").send(usuario);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);
  });

  test("Inserir um Usuário com a URL Inválido", async () => {
    const usuario = {
      nome: "Vulgo de Castro",
      urlFotoPerfil: "https://urlInvalida.com.br",
    };
    const resp = await request.post("/usuarios").send(usuario);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual([
      {
        mensagem: "URL deve uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });

  test("Inserir um Usuário com Nome e URL Inválidos", async () => {
    const usuario = {
      nome: "",
      urlFotoPerfil: "xxxxxxxxxxxxxxxxx",
    };
    const resp = await request.post("/usuarios").send(usuario);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
      {
        mensagem: "URL deve uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });

  test("Deletar Usuários com ID Existente", async () => {
    const resp = await request.delete("/usuarios/1");
    expect(resp.statusCode).toBe(204);
  });

  test("Deletar Usuários com ID Inexistente", async () => {
    const resp = await request.delete("/usuarios/99");
    expect(resp.statusCode).toBe(404);
  });

  test("Atualizar um Usuário com Id Existente com os Dados Válidos", async () => {
    const usuario = {
      nome: "Aleatório",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/16.jpg",
    };
    const resp = await request.put("/usuarios/3").send(usuario);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ id: 3, ...usuario });
  });

  test("Atualizar um Usuário com Id inexistente", async () => {
    const usuario = {
      nome: "Aleatório",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/16.jpg",
    };
    const resp = await request.put("/usuarios/999").send(usuario);

    expect(resp.statusCode).toBe(404);
  });

  test("Buscar Usuários por Nome Existente", async () => {
    const resp = await request.get("/usuarios/nome/Mauricio");
    const usuario = [
      {
        id: 2,
        nome: "Mauricio Menezes",
        urlFotoPerfil: "https://avatars.githubusercontent.com/u/20570844?v=4",
      },
    ];

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(usuario);
  });

  test("Buscar Usuários por Nome Inexistente", async () => {
    const resp = await request.get("/usuarios/nome/pedro");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([]);
  });

  test("Buscar Dados Pessoais do Usuários com Id Existente", async () => {
    const resp = await request.get("/usuarios/2/dados-pessoais");
    const dadosPessoaisUsuario = {
      nomeCompleto: "Mauricio Souza Menezes",
      dataNascimento: "1995-07-30",
      rg: "9999999999",
      cpf: "99999999999",
    };

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(dadosPessoaisUsuario);
  });

  test("Buscar Dados Pessoais do Usuários com Id Inexistente", async () => {
    const resp = await request.get("/usuarios/99/dados-pessoais");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([]);
  });

  test("Atualizar Dados Pessoais de um Usuário com Id Existente", async () => {
    const dadosPessoaisUsuario = {
      nomeCompleto: "Mauricio Menezes",
      dataNascimento: "1995-07-30",
      rg: "9999999999",
      cpf: "99999999999",
    };
    const resp = await request
      .put("/usuarios/2/dados-pessoais")
      .send(dadosPessoaisUsuario);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(dadosPessoaisUsuario);
  });
});
