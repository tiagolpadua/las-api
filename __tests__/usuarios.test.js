const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

describe("API de Usuários", () => {
  test("Listar Usuários", async () => {
    const res = await request.get("/usuarios");
    expect(res.body).toEqual([
      { id: 1, nome: "lucas", urlFotoPerfil: null },
      {
        id: 3,
        nome: "nomee",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
      },
      {
        id: 4,
        nome: "marcos",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/55.jpg",
      },
      {
        id: 5,
        nome: "m",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/55.jpg",
      },
    ]);
  });
  test("Adicionar Usuário com Dados Válidos", async () => {
    const res = await request.post("/usuarios").send({
      nome: "nome",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
    expect(res.body).toEqual({
      id: 99,
      nome: "nome",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
  });
  test("Valida POST Nome Inválido ou Repetido", async () => {
    const resNomeInvalido = await request.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
    expect(resNomeInvalido.statusCode).toBe(400);
    expect(resNomeInvalido.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);
  });

  test("Valida POST URL Inválida", async () => {
    const resNomeInvalido = await request.post("/usuarios").send({
      nome: "nomee",
      urlFotoPerfil: "XXXXXXXXX",
    });
    expect(resNomeInvalido.statusCode).toBe(400);
    expect(resNomeInvalido.body).toEqual([
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

  test("Altera Usuário Existente", async () => {
    const res = await request.put("/usuarios/5").send({
      id: 5,
      nome: "m",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/55.jpg",
    });
    expect(res.body).toEqual({
      id: 5,
      nome: "m",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/55.jpg",
    });

    expect(res.statusCode).toBe(200);
  });
  test("Altera Usuário Inexistente", async () => {
    const res = await request.put("/usuarios/99").send({
      nome: "lucas",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/16.jpg",
    });
    expect(res.statusCode).toBe(404);
  });
  test("Buscar Usuário por Id Existente", async () => {
    const res = await request.get("/usuarios/3");
    expect(res.body).toEqual({
      id: 3,
      nome: "nomee",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
    expect(res.statusCode).toBe(200);
  });
  test("Buscar Usuário por Id Inexistente", async () => {
    const res = await request.get("/usuarios/989");
    expect(res.statusCode).toBe(404);
  });

  test("Buscar Usuário por Nome Existente", async () => {
    const res = await request.get("/usuarios/nome/lucas");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, nome: "lucas", urlFotoPerfil: null });
  });
  test("Buscar Usuário por Nome Inexistente", async () => {
    const res = await request.get("/usuarios/nome/l");
    expect(res.statusCode).toBe(404);
  });
  test("Apaga Usuários Existente", async () => {
    const res = await request.delete("/usuarios/1");
    expect(res.statusCode).toBe(204);
  });
  test("Apaga Usuários Inexistente", async () => {
    const res = await request.delete("/usuarios/99");
    expect(res.statusCode).toBe(404);
  });

  //dados pessoais
  describe("API de Dados Pessoais", () => {
    test("Buscar Dados Pessoais por Id Existente", async () => {
      const res = await request.get("/usuarios/1/dados-pessoais");
      expect(res.body).toEqual({
        id: 1,
        nomeCompleto: "lucas lima",
        dataNascimento: null,
        rg: "252525252",
        cpf: null,
      });
      expect(res.statusCode).toBe(200);
    });
    test("Buscar Dados Pessoais por Id Inexistente", async () => {
      const res = await request.get("/usuarios/99/dados-pessoais");
      expect(res.statusCode).toBe(200);
    });
  });

  // //contatos
  describe("API de Contatos", () => {
    test("Buscar Contatos por Id Existente", async () => {
      const res = await request.get("/usuarios/3/contatos");
      expect(res.body).toEqual({
        id: 4,
        telefone: "797979797",
        celular: "565655656",
        email: "saajsajsnj@ksds.com",
      });
      expect(res.statusCode).toBe(200);
    });

    test("Buscar Contatos por Id Inexistente", async () => {
      const res = await request.get("/usuarios/99/contatos");
      expect(res.statusCode).toBe(200);
    });
  });

  // //endereco
  describe("API de Endereços", () => {
    test("Buscar Usuário por Id Existente", async () => {
      const res = await request.get("/usuarios/1/endereco");
      expect(res.body).toEqual({
        id: 1,
        cep: "74040233",
        endereco: "rua x",
        numero: 11,
        complemento: "bairro",
      });
      // expect(res.statusCode).toBe(200);
    });
    test("Buscar Usuário por Nome Inexistente", async () => {
      const res = await request.get("/usuarios/99/endereco");
      expect(res.statusCode).toBe(200);
    });
  });
});
