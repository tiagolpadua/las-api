const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");
const request = supertest(customExpress());

jest.mock("../src/repositorios/eventos");

describe("API de Eventos", () => {
    test("Consultar lista de Eventos", async () => {
        const resp = await request.get("/eventos");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([
            {
                "id": 1,
                "nome": "Sao Joao 2022",
                "descricao": "Sao Joao da cidade de Pojuca do ano de 2022",
                "urlFoto": "https://blog.gazinatacado.com.br/wp-content/uploads/2016/06/como-preparar-a-loja-para-festas-juninas.png",
                "dataInicio": "2022-06-22T03:00:00.000Z",
                "dataFim": "2022-06-25T03:00:00.000Z",
                "status": "agendado"
            },
            {
                "id": 2,
                "nome": "Carnaval 2022",
                "descricao": "Carnaval de Salvador do ano de 2022",
                "urlFoto": "https://blog.gazinatacado.com.br/wp-content/uploads/2016/06/como-preparar-a-loja-para-festas-juninas.png",
                "dataInicio": "2022-06-22T03:00:00.000Z",
                "dataFim": "2022-06-25T03:00:00.000Z",
                "status": "agendado"
            }
        ]);
    });
    test("Consultar eventos por um id existente", async () => {
        const resp = await request.get("/eventos/1");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            "id": 1,
            "nome": "Sao Joao 2022",
            "descricao": "Sao Joao da cidade de Pojuca do ano de 2022",
            "urlFoto": "https://blog.gazinatacado.com.br/wp-content/uploads/2016/06/como-preparar-a-loja-para-festas-juninas.png",
            "dataInicio": "2022-06-22T03:00:00.000Z",
            "dataFim": "2022-06-25T03:00:00.000Z",
            "status": "agendado"
        });
    });
    test("Buscar eventos por um id inexistente", async () => {
        const resp = await request.get("/eventos/500");
        expect(resp.statusCode).toBe(404);
    });
    test("Inserir evento", async () => {
        const resp = await request.post("/eventos").send({
            "nome": "Carnaval 2023",
            "descricao": "Carnaval de Salvador do ano de 2023",
            "urlFoto": "https://blog.gazinatacado.com.br/wp-content/uploads/2016/06/como-preparar-a-loja-para-festas-juninas.png",
            "dataInicio": "2022-06-22T03:00:00.000Z",
            "dataFim": "2022-06-25T03:00:00.000Z",
            "status": "agendado"
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({ "dataFim": "2022-06-25T03:00:00.000Z", "dataInicio": "2022-06-22T03:00:00.000Z", "descricao": "Carnaval de Salvador do ano de 2023", "id": 99, "nome": "Carnaval 2023", "status": "agendado", "urlFoto": "https://blog.gazinatacado.com.br/wp-content/uploads/2016/06/como-preparar-a-loja-para-festas-juninas.png" });
    });
    test("Alterar evento com dados válidos", async () => {
        const resp = await request.put("/eventos/2").send({
            nome: "Carnaval 2024"
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ "dataFim": "2022-06-25T03:00:00.000Z", "dataInicio": "2022-06-22T03:00:00.000Z", "descricao": "Carnaval de Salvador do ano de 2022", "id": 2, "nome": "Carnaval 2022", "status": "agendado", "urlFoto": "https://blog.gazinatacado.com.br/wp-content/uploads/2016/06/como-preparar-a-loja-para-festas-juninas.png" });
    });
    test("Excluir um usuário", async () => {
        const resp = await request.delete("/eventos/2");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([{ "dataFim": "2022-06-25T03:00:00.000Z", "dataInicio": "2022-06-22T03:00:00.000Z", "descricao": "Sao Joao da cidade de Pojuca do ano de 2022", "id": 1, "nome": "Sao Joao 2022", "status": "agendado", "urlFoto": "https://blog.gazinatacado.com.br/wp-content/uploads/2016/06/como-preparar-a-loja-para-festas-juninas.png" }]);
    });
});