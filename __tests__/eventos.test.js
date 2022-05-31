const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/eventos");


describe("API de Eventos", () => {
  test("Listar Eventos", async () => {
    const resp = await request.get("/eventos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        "id": 1,
        "nome": "Carnaval 2022", 
        "descricao": "O carnaval mais animado do Brasil", 
        "urlFoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg", 
        "dataInicio": "2023-02-28", 
        "dataFim": "2023-03-05",
        "status": "agendado"
      },
      {
        "id": 2,
        "nome": "Só track boa", 
        "descricao": "A festa mais punk do mundo", 
        "urlFoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg", 
        "dataInicio": "2022-05-27", 
        "dataFim": "2022-05-28",
        "status": "finalizado"
      },
      {
        "id": 3,
        "nome": "Festa de Santo Antonio", 
        "descricao": "Evento em comemoração ao padroeiro da cidade de Jequié", 
        "urlFoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg", 
        "dataInicio": "2022-05-31", 
        "dataFim": "2022-06-13",
        "status": "em-andamento"
      }
    ]);
  });


  test("Buscar Eventos por id existente", async () => {
    const resp = await request.get("/eventos/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        "id": 1,
        "nome": "Carnaval 2022", 
        "descricao": "O carnaval mais animado do Brasil", 
        "urlFoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg", 
        "dataInicio": "2023-02-28", 
        "dataFim": "2023-03-05",
        "status": "agendado"
      }
    );
  });

  test("Buscar Eventos por id inexistente", async () => {
    const resp = await request.get("/eventos/999");
    expect(resp.statusCode).toBe(404);
  });

  test("Buscar Eventos por status Agendado", async () => {
    const resp = await request.get("/eventos/status/agendado");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        "dataFim": "2023-03-05", "dataInicio": "2023-02-28", "descricao": "O carnaval mais animado do Brasil", "id": 1, "nome": "Carnaval 2022", "status": "agendado", "urlFoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg"
      }
    ]);
  });

  test("Buscar Eventos por status Em Andamento", async () => {
    const resp = await request.get("/eventos/status/em-andamento");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {"dataFim": "2022-06-13", "dataInicio": "2022-05-31", "descricao": "Evento em comemoração ao padroeiro da cidade de Jequié", "id": 3, "nome": "Festa de Santo Antonio", "status": "em-andamento", "urlFoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg"
      }
    ]);
  });
  test("Buscar Eventos por status Finalizado", async () => {
    const resp = await request.get("/eventos/status/finalizado");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        "dataFim": "2022-05-28", "dataInicio": "2022-05-27", "descricao": "A festa mais punk do mundo", "id": 2, "nome": "Só track boa", "status": "finalizado", "urlFoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg"
      }
    ]);
  });



  test("Adicionar Eventos com Dados Válidos", async () => {
    const resp = await request.post("/eventos").send(
      {
        nome: "Carnaval 2022", 
        descricao: "O carnaval mais animado do Brasil", 
        urlFoto: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg", 
        dataInicio: "2023-02-28", 
        dataFim: "2023-03-05",
      }
    );
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual(
      {
        "dataFim": "2023-03-05", "dataInicio": "2023-02-28", "descricao": "O carnaval mais animado do Brasil", "id": 99, "nome": "Carnaval 2022", "urlFoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg"
      }
    );
  });


  test("Atualizar Eventos com id existente", async () => {
    const resp = await request.put("/eventos/1").send(
      {
        "nome": "Carnaval 2022", 
        "descricao": "O carnaval mais animado do Brasil", 
        "urlFoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg", 
        "dataInicio": "2023-02-28", 
        "dataFim": "2023-03-05",
        "status": "agendado"
      }
    );
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        dataFim: "2023-03-05",
        dataInicio: "2023-02-28",
        descricao: "O carnaval mais animado do Brasil",
        id: 1,
        nome: "Carnaval 2022",
        status: "agendado",
        urlFoto: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg",
      }
    );
  });

  test("Atualizar Eventos com id inexistente", async () => {
    const resp = await request.put("/eventos/999").send(
      {
        "nome": "Carnaval 2022", 
        "descricao": "O carnaval mais animado do Brasil", 
        "urlFoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg/1920px-Bloco_da_capoeira_circuito_Campo_Grande_Salvador.jpg", 
        "dataInicio": "2023-02-28", 
        "dataFim": "2023-03-05",
        "status": "agendado"
      }
    );
    expect(resp.statusCode).toBe(404);
  });

  test("Deletar Eventos com id existente", async () => {
    const resp = await request.delete("/eventos/1");
    expect(resp.statusCode).toBe(204);
  });

  test("Deletar Eventos com id inexistente", async () => {
    const resp = await request.delete("/eventos/999");
    expect(resp.statusCode).toBe(404);
  });





});