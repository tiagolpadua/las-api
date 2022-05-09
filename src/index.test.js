const pool = require("./infraestrutura/database/conexao");
const Tabelas = require("./infraestrutura/database/tabelas");
const queries = require("./infraestrutura/database/queries");
const usuariosRepository = require("./repositorios/usuario");
const eventosController = require("./controllers/eventos");
const eventosModel = require("./models/eventos");
const tiposVendasController = require("./controllers/tiposVendas");
const moment = require("moment");

const urlsGet = [];
const urlsPost = [];
const urlsPut = [];
const urlsDelete = [];

eventosController &&
  eventosController({
    get: (url) => urlsGet.push(url),
    put: (url) => urlsPut.push(url),
    post: (url) => urlsPost.push(url),
    delete: (url) => urlsDelete.push(url),
  });

tiposVendasController &&
  tiposVendasController({
    get: (url) => urlsGet.push(url),
    put: (url) => urlsPut.push(url),
    post: (url) => urlsPost.push(url),
    delete: (url) => urlsDelete.push(url),
  });

describe("Essencial", () => {
  test("Refatore a configuraçao de conexão", () => {
    expect(pool).toBeDefined();
  });

  test("Refatore a configuração de tabelas", () => {
    expect(Tabelas).toBeDefined();
  });

  test("Crie o módulo de acionamento de queries", () => {
    expect(queries).toBeDefined();
  });

  test("Criar o repositório de usuários", () => {
    expect(usuariosRepository).toBeDefined();
  });

  test("Criar a tabela de Eventos", () => {
    expect(Tabelas.criarEventos).toBeDefined();
  });

  test("API de listagem de eventos", () => {
    expect(urlsGet.find((url) => url === "/eventos")).toBeDefined();
  });

  test("API de detalhamento de evento", () => {
    expect(urlsGet.find((url) => url === "/eventos/:id")).toBeDefined();
  });

  test("Criar a tabela de Tipos de Vendas", () => {
    expect(Tabelas.criarTiposVendas).toBeDefined();
  });

  test("API de listagens de Tipos de Vendas", () => {
    expect(urlsGet.find((url) => url === "/tipos-vendas")).toBeDefined();
  });
});

describe("Desejável", () => {
  test("Crie as APIs para incluir, alterar e excluir eventos", () => {
    expect(urlsPost.find((url) => url === "/eventos")).toBeDefined();
    expect(urlsPut.find((url) => url === "/eventos/:id")).toBeDefined();
    expect(urlsDelete.find((url) => url === "/eventos/:id")).toBeDefined();
  });

  test("Crie as APIs para detalhar, incluir, alterar e excluir tipos de vendas", () => {
    expect(urlsGet.find((url) => url === "/tipos-vendas/:id")).toBeDefined();
    expect(urlsPost.find((url) => url === "/tipos-vendas")).toBeDefined();
    expect(urlsPut.find((url) => url === "/tipos-vendas/:id")).toBeDefined();
    expect(urlsDelete.find((url) => url === "/tipos-vendas/:id")).toBeDefined();
  });

  test("Configurar moment", () => {
    expect(moment).toBeDefined();
  });
});

describe("Desafio", () => {
  test("Validação Avançada de Datas dos Eventos", () => {
    expect(
      urlsGet.find((url) => url === "/eventos/status/:status")
    ).toBeDefined();
  });

  test("Listagem de eventos por status", () => {
    // Data do evento anterior ao dia de hoje
    expect(
      eventosModel.isDatasValidas({
        dataInicio: "2021-01-01",
        dataFim: "2021-01-02",
      })
    ).toBeFalsy();

    // Data de fim do evento anterior à data de início
    expect(
      eventosModel.isDatasValidas({
        dataInicio: "2023-01-10",
        dataFim: "2023-01-09",
      })
    ).toBeFalsy();

    // Data de fim do evento posterior à data de início
    expect(
      eventosModel.isDatasValidas({
        dataInicio: "2023-01-10",
        dataFim: "2023-01-11",
      })
    ).toBeTruthy();
  });
});
