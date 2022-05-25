const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario.js");
describe("API de Usuários", () => {
  test("Listar Usuários", async () => {
    const res = await request.get("/usuarios");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        nome: "lucas",
        urlFotoPerfil: null,
        nomeCompleto: "lucas lima",
        dataNascimento: null,
        rg: "252525252",
        cpf: null,
        telefone: null,
        celular: null,
        email: null,
        cep: null,
        endereco: null,
        numero: null,
        complemento: null,
        senha: "admin",
      },
      {
        id: 3,
        nome: "nomee",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
        nomeCompleto: null,
        dataNascimento: null,
        rg: null,
        cpf: "121212121",
        telefone: "797979797",
        celular: "565655656",
        email: "saajsajsnj@ksds.com",
        cep: "74040233",
        endereco: "rua x",
        numero: 11,
        complemento: "bairro",
        senha: null,
      },
    ]);
  });

  test("Buscar usuário por id existente", async () => {
    const res = await request.get("/usuarios/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        nome: "lucas",
        urlFotoPerfil: null,
        nomeCompleto: "lucas lima",
        dataNascimento: null,
        rg: "252525252",
        cpf: null,
        telefone: null,
        celular: null,
        email: null,
        cep: null,
        endereco: null,
        numero: null,
        complemento: null,
        senha: "admin",
      },
    ]);
  });
  test("Buscar usuário por id inexistente", async () => {
    const res = await request.get("/usuarios/99");
    expect(res.statusCode).toBe(404);
  });

  test("Adicionar Usuário com Dados Válidos", async () => {
    const res = await request.post("/usuarios").send({
      nome: "nomee",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      id: 3,
      nome: "nomee",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
  });
  test("Valida POST Nome Inválido ou Repetido", async () => {
    const resNomeInvalido = await request.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
    expect(resNomeInvalido.statusCode).toBe(400);
    expect(resNomeInvalido.body).toEqual({
      erroApp: [
        {
          mensagem: "Nome deve ser informado e deve ser único",
          nome: "nome",
          valido: false,
        },
      ],
    });
  });

  test("Valida POST URL Inválida", async () => {
    const resNomeInvalido = await request.post("/usuarios").send({
      nome: "nomee",
      urlFotoPerfil: "XXXXXXXXX",
    });
    expect(resNomeInvalido.statusCode).toBe(400);
    expect(resNomeInvalido.body).toEqual({
      erroApp: [
        {
          nome: "urlFotoPerfil",
          valido: false,
          mensagem: "URL deve uma URL válida",
        },
      ],
    });
  });
});
