const conexao = undefined; // require("./infraestrutura/conexao");
const Tabelas = undefined; // require("./infraestrutura/tabelas");
const usuariosController = undefined; // require("./controllers/usuarios");
const Usuario = undefined; // require("./models/usuarios");
const nodemon = undefined; // require("nodemon");
const consign = undefined; // require("consign");

const urlsGet = [];
const urlsPost = [];
const urlsPut = [];
const urlsDelete = [];

usuariosController &&
  usuariosController({
    get: (url) => urlsGet.push(url),
    put: (url) => urlsPut.push(url),
    post: (url) => urlsPost.push(url),
    delete: (url) => urlsDelete.push(url),
  });

describe("Essencial", () => {
  test("Configurar o Banco de Dados", () => {
    expect(conexao.connect).toBeDefined();
  });

  test("Crie a tabela Usuarios", () => {
    expect(Tabelas.criarUsuarios).toBeDefined();
  });

  test("API de Busca de Usuário", () => {
    expect(urlsGet.find((url) => url === "/usuarios/:id")).toBeDefined();
  });
});

describe("Desejável", () => {
  test("Configurar nodemon", () => {
    expect(nodemon).toBeDefined();
  });

  test("Configurar consign", () => {
    expect(consign).toBeDefined();
  });

  test("API de Criação Usuário", () => {
    expect(urlsPost.find((url) => url === "/usuarios")).toBeDefined();
  });

  test("API de Alteração de Usuário", () => {
    expect(urlsPut.find((url) => url === "/usuarios/:id")).toBeDefined();
  });

  test("API de Listagem de Usuários", () => {
    expect(urlsGet.find((url) => url === "/usuarios")).toBeDefined();
  });

  test("API de Exclusão de Usuários", () => {
    expect(urlsDelete.find((url) => url === "/usuarios/:id")).toBeDefined();
  });
});

describe("Desafio", () => {
  test("API de Busca de Usuários pelo Nome", () => {
    expect(urlsGet.find((url) => url === "/usuarios/nome/:nome")).toBeDefined();
  });

  test("Validação de URL da Foto de Perfil", async () => {
    expect(await Usuario.validarURLFotoPerfil("foo")).toBeFalsy();

    expect(
      await Usuario.validarURLFotoPerfil("http://enderecoinvalido.com.br")
    ).toBeFalsy();

    expect(
      await Usuario.validarURLFotoPerfil(
        "https://www.randomuser.me/api/portraits/men/91.jpg"
      )
    ).toBeTruthy();
  });

  test("Validação de Nome de Usuário", () => {
    expect(Usuario.validarNomeUsuarioNaoUtilizado).toBeDefined();
  });
});
