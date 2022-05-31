const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/eventos");

describe("API de Eventos", () => {
  test("Listar eventos", async () => {
    const resp = await request.get("/eventos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
          "id":1,
          "nome":"Salvador Fest",
          "descricao":"Evento popular na Capital Baiana",
          "urlFoto":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.guicheweb.com.br%2Ffestival-de-verao-nilopolis_15784&psig=AOvVaw3dspfyhj3GurDkdi51txza&ust=1652383515284000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKiNm7iW2PcCFQAAAAAdAAAAABAD",
          "dataInicio":"2022-05-30T03:00:00.000Z",
          "dataFim":"2022-05-31T03:00:00.000Z",
          "status":"agendado"
      },
      {
          "id":2,
          "nome":"Republica do Reggae",
          "descricao":"Maior festival de reggae da America Latina",
          "urlFoto":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.salvadordabahia.com%2Feventos%2Frepublica-do-reggae%2F&psig=AOvVaw0S68YsNzB1sQV9P1mZ8wB_&ust=1652384359177000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLD8r8qZ2PcCFQAAAAAdAAAAABAD",
          "dataInicio":"2022-07-07T03:00:00.000Z",
          "dataFim":"2022-07-09T03:00:00.000Z",
          "status":"agendado"
      }
    ]);
  });

  test("Buscar evento por id existente", async () => {
    const resp = await request.get("/eventos/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        "id": 1,
        "nome": "Salvador Fest",
        "descricao": "Evento popular na Capital Baiana",
        "urlFoto": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.guicheweb.com.br%2Ffestival-de-verao-nilopolis_15784&psig=AOvVaw3dspfyhj3GurDkdi51txza&ust=1652383515284000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKiNm7iW2PcCFQAAAAAdAAAAABAD",
        "dataInicio": "2022-05-30T03:00:00.000Z",
        "dataFim": "2022-05-31T03:00:00.000Z",
        "status": "agendado"
      }
    );
  });

  test("Buscar evento por id inexistente", async () => {
    const resp = await request.get("/eventos/9999");
    expect(resp.statusCode).toBe(404);
  });

  test("Adicionar evento válido", async () => {
    const resp = await request.post("/eventos").send({
      "nome": "Carnaval de Salvador",
      "descricao": "Maior carnaval do mundo!",
      "urlFoto": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.guicheweb.com.br%2Ffestival-de-verao-nilopolis_15784&psig=AOvVaw3dspfyhj3GurDkdi51txza&ust=1652383515284000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKiNm7iW2PcCFQAAAAAdAAAAABAD",
      "dataInicio": "2023-02-24",
      "dataFim": "2023-02-29"
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      "nome": "Carnaval de Salvador",
      "descricao": "Maior carnaval do mundo!",
      "urlFoto": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.guicheweb.com.br%2Ffestival-de-verao-nilopolis_15784&psig=AOvVaw3dspfyhj3GurDkdi51txza&ust=1652383515284000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKiNm7iW2PcCFQAAAAAdAAAAABAD",
      "dataInicio": "2023-02-24",
      "dataFim": "2023-02-29"
    });
  });

  test("Adicionar evento com data inválida", async () => {
    const resp = await request.post("/eventos").send({
      "nome": "Salvador Fest",
      "descricao": "Evento popular na Capital Baiana",
      "urlFoto": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.guicheweb.com.br%2Ffestival-de-verao-nilopolis_15784&psig=AOvVaw3dspfyhj3GurDkdi51txza&ust=1652383515284000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKiNm7iW2PcCFQAAAAAdAAAAABAD",
      "dataInicio": "2023-01-31T03:00:00.000Z",
      "dataFim": "2023-01-30T03:00:00.000Z",
    });
    expect(resp.statusCode).toBe(201);
  });

  test("Alterar evento com dados válidos", async () => {
    const resp = await request.put("/eventos/2").send({
      "nome": "Republica do Reggae 2023"
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        "id": 2,
        "nome": "Republica do Reggae 2023"
      }
    );
  });

  test("Excluir evento", async () => {
    const resp = await request.delete("/eventos/1");
    expect(resp.statusCode).toBe(200);
  });

  test("Buscar evento por status", async () => {
    const resp = await request.get("/eventos/status/agendado");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        "id": 1,
        "nome": "Salvador Fest",
        "descricao": "Evento popular na Capital Baiana",
        "urlFoto": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.guicheweb.com.br%2Ffestival-de-verao-nilopolis_15784&psig=AOvVaw3dspfyhj3GurDkdi51txza&ust=1652383515284000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKiNm7iW2PcCFQAAAAAdAAAAABAD",
        "dataInicio": "2022-05-30T03:00:00.000Z",
        "dataFim": "2022-05-31T03:00:00.000Z",
        "status": "agendado"
      },
      {
        "id": 2,
        "nome": "Republica do Reggae",
        "descricao": "Maior festival de reggae da America Latina",
        "urlFoto": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.salvadordabahia.com%2Feventos%2Frepublica-do-reggae%2F&psig=AOvVaw0S68YsNzB1sQV9P1mZ8wB_&ust=1652384359177000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLD8r8qZ2PcCFQAAAAAdAAAAABAD",
        "dataInicio": "2022-07-07T03:00:00.000Z",
        "dataFim": "2022-07-09T03:00:00.000Z",
        "status": "agendado"
      }
    ]);
  });
});