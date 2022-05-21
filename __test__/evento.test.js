const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const rotas = supertest(customExpress());

jest.mock("../src/repositorios/eventos");

const retornoEventos = [
  {
    id: 1,
    nome: "Carnaval",
    descricao: "festa popular",
    urlFoto: "https://randomuser.me/api/portraits/men/98.jpg",
    dataInicio: "2023-02-10T03:00:00.000Z",
    dataFim: "2023-02-17T03:00:00.000Z",
    status: "agendado",
  },
  {
    id: 2,
    nome: "Carnaval de Bairro",
    descricao: "festa popular nos bairros",
    urlFoto: "https://randomuser.me/api/portraits/men/98.jpg",
    dataInicio: "2022-05-10T03:00:00.000Z",
    dataFim: "2022-05-30T03:00:00.000Z",
    status: "em-andamento",
  },
  {
    id: 3,
    nome: "Lavagem de Itapuã",
    descricao: "festa popular nos bairros",
    urlFoto: "https://randomuser.me/api/portraits/men/98.jpg",
    dataInicio: "2022-05-10T03:00:00.000Z",
    dataFim: "2022-05-12T03:00:00.000Z",
    status: "finalizado",
  },
];

// const retornoEventosSemStatus = [
//   {
//     id: 1,
//     nome: "Carnaval",
//     descricao: "festa popular",
//     urlFoto: "https://randomuser.me/api/portraits/men/98.jpg",
//     dataInicio: "2023-02-10T03:00:00.000Z",
//     dataFim: "2023-02-17T03:00:00.000Z",
//   },
//   {
//     id: 2,
//     nome: "Carnaval de Bairro",
//     descricao: "festa popular nos bairros",
//     urlFoto: "https://randomuser.me/api/portraits/men/98.jpg",
//     dataInicio: "2022-05-10T03:00:00.000Z",
//     dataFim: "2022-05-30T03:00:00.000Z",
//   },
//   {
//     id: 3,
//     nome: "Lavagem de Itapuã",
//     descricao: "festa popular nos bairros",
//     urlFoto: "https://randomuser.me/api/portraits/men/98.jpg",
//     dataInicio: "2022-05-10T03:00:00.000Z",
//     dataFim: "2022-05-12T03:00:00.000Z",
//   },
// ];

describe("Testa API EVENTOS GET", () => {
  test("API de Eventos", async () => {
    const response = await rotas.get("/eventos");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(retornoEventos);
  });

  // Buscas por ID

  test("Retorna Eventos por ID existente", async () => {
    const id = 2;
    const retorno = retornoEventos.filter((usuario) => usuario.id === id);

    const response = await rotas.get(`/eventos/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(retorno[0]);
  });

  test("Retorna Eventos por ID inexistente", async () => {
    const id = "99999";
    const retorno = "Id inválido fornecido";

    const response = await rotas.get(`/eventos/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(retorno);
  });

  test("Retorna Eventos tipo ID diferente de Number", async () => {
    const id = "kkkk";
    const retorno = "Id inválido fornecido";

    const response = await rotas.get(`/eventos/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(retorno);
  });

  // FIM Buscas por ID

  // Buscas por nome

  test("Retorna eventos por status: agendado", async () => {
    const status = "agendado";

    const response = await rotas.get(`/eventos/status/${status}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        nome: "Carnaval",
        descricao: "festa popular",
        urlFoto: "https://randomuser.me/api/portraits/men/98.jpg",
        dataInicio: "2023-02-10T03:00:00.000Z",
        dataFim: "2023-02-17T03:00:00.000Z",
      },
    ]);
  });

  test("Retorna eventos por status: em-andamento", async () => {
    const status = "em-andamento";

    const response = await rotas.get(`/eventos/status/${status}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: 2,
        nome: "Carnaval de Bairro",
        descricao: "festa popular nos bairros",
        urlFoto: "https://randomuser.me/api/portraits/men/98.jpg",
        dataInicio: "2022-05-10T03:00:00.000Z",
        dataFim: "2022-05-30T03:00:00.000Z",
      },
    ]);
  });

  test("Retorna eventos por status: finalizado", async () => {
    const status = "finalizado";

    const response = await rotas.get(`/eventos/status/${status}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: 3,
        nome: "Lavagem de Itapuã",
        descricao: "festa popular nos bairros",
        urlFoto: "https://randomuser.me/api/portraits/men/98.jpg",
        dataInicio: "2022-05-10T03:00:00.000Z",
        dataFim: "2022-05-12T03:00:00.000Z",
      },
    ]);
  });

  test("Retorna status inválido", async () => {
    const status = "kkkk";

    const response = await rotas.get(`/eventos/status/${status}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Status inválido fornecido");
  });
});

describe("Testa API EVENTOS POST", () => {
  test("Adicionar eventos com dados válidos", async () => {
    const response = await rotas.post("/eventos").send({
      nome: "Ensaio Ilê",
      descricao: "festa popular nos bairros",
      urlFoto: "https://randomuser.me/api/portraits/men/44.jpg",
      dataInicio: "25-05-2022",
      dataFim: "12-05-2023",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: 4,
      nome: "Ensaio Ilê",
      descricao: "festa popular nos bairros",
      urlFoto: "https://randomuser.me/api/portraits/men/44.jpg",
      dataInicio: "25-05-2022",
      dataFim: "12-05-2023",
      status: "em-andamento",
    });
  });

  test("Adicionar eventos com data inválida", async () => {
    const response = await rotas.post("/eventos").send({
      nome: "Ensaio Ilê",
      descricao: "festa popular nos bairros",
      urlFoto: "https://randomuser.me/api/portraits/men/44.jpg",
      dataInicio: "01-05-2022",
      dataFim: "12-05-2023",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual([
      {
        nome: "data",
        mensagem: "Data inválida!",
        resultado: true,
      },
    ]);
  });

  test("Adicionar eventos com nome já existente", async () => {
    const response = await rotas.post("/eventos").send({
      nome: "Carnaval de Bairro",
      descricao: "festa popular nos bairros",
      urlFoto: "https://randomuser.me/api/portraits/men/44.jpg",
      dataInicio: "01-06-2022",
      dataFim: "12-05-2023",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual([
      {
        nome: "existeEvento",
        mensagem: "Evento já existe na base de dados",
        resultado: true,
      },
    ]);
  });
});

describe("Testa API EVENTOS PUT", () => {
  test("Adicionar eventos com dados válidos", async () => {
    const response = await rotas.put("/eventos/1").send({
      nome: "Ensaio Ilê",
      descricao: "festa popular nos bairros",
      urlFoto: "https://randomuser.me/api/portraits/men/44.jpg",
      dataInicio: "25-05-2022",
      dataFim: "12-05-2023",
    });

    expect(response.statusCode).toBe(405);
    expect(response.body).toEqual({
      id: 4,
      nome: "Ensaio Ilê",
      descricao: "festa popular nos bairros",
      urlFoto: "https://randomuser.me/api/portraits/men/44.jpg",
      dataInicio: "25-05-2022",
      dataFim: "12-05-2023",
      status: "em-andamento",
    });
  });
});
//

//   test("Rejeita usuário com nome inválido", async () => {
//     const response = await rotas.post("/usuarios").send({
//       urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
//     });

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toEqual({
//       descrição: "Entrada inválida",
//       erro: [
//         {
//           mensagem: "Usuário deve ser informado e ser único",
//           nome: "existeUsuario",
//           resultado: true,
//         },
//       ],
//     });
//   });

//   test("Rejeita usuário com nome existente", async () => {
//     const response = await rotas.post("/usuarios").send({
//       nome: "Veveta",
//       urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
//     });

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toEqual({
//       descrição: "Entrada inválida",
//       erro: [
//         {
//           mensagem: "Usuário deve ser informado e ser único",
//           nome: "existeUsuario",
//           resultado: true,
//         },
//       ],
//     });
//   });

//   test("Adicionar usuário com url inválida", async () => {
//     const response = await rotas.post("/usuarios").send({
//       nome: "Bel Marques",
//       urlFotoPerfil: "https://randomuser.me/api/portraits/men/67jpg",
//     });

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toEqual({
//       descrição: "Entrada inválida",
//       erro: [
//         {
//           mensagem: "URL inválida!",
//           nome: "url",
//           resultado: true,
//         },
//       ],
//     });
//   });

//   test("Adicionar usuário com url inexistente", async () => {
//     const response = await rotas.post("/usuarios").send({
//       nome: "Bel Marques",
//     });

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toEqual({
//       descrição: "Entrada inválida",
//       erro: [
//         {
//           mensagem: "URL inválida!",
//           nome: "url",
//           resultado: true,
//         },
//       ],
//     });
//   });
// });

// describe("Testa API PUT", () => {
//   test("Atualiza usuário com dados válidos", async () => {
//     const response = await rotas.put("/usuarios/2").send({
//       nome: "Luís Caldas",
//       urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
//     });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual({
//       status: "Usuário atualizado com sucesso",
//     });
//   });

//   test("Atualiza usuário já cadastrado", async () => {
//     const response = await rotas.put("/usuarios/2").send({
//       nome: "Veveta",
//       urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
//     });

//     expect(response.statusCode).toBe(405);
//     expect(response.body).toEqual({
//       erro: [
//         {
//           nome: "existeUsuarioPUT",
//           mensagem: "Usuario já existe na base de dados",
//           resultado: true,
//         },
//       ],
//       status: "Entrada inválida",
//     });
//   });
// });

// describe("Testa API DELETE", () => {
//   test("Apaga usuário na base de dados", async () => {
//     const response = await rotas.delete("/usuarios/2");

//     expect(response.statusCode).toBe(204);
//   });

//   test("Apaga usuário inexistente na base de dados", async () => {
//     const response = await rotas.delete("/usuarios/1");

//     expect(response.statusCode).toBe(404);
//     expect(response.body).toEqual("Usuário não encontrado");
//   });

//   test("Apaga usuário com ID inexistente", async () => {
//     const response = await rotas.delete("/usuarios/efef");

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toEqual("Id inválido fornecido");
//   });
// });
