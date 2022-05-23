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
      urlFotoPerfil: "https://urlInvalida.com.br",
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
});
