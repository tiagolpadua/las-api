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
    // test("Buscar tipos de vendas por um id inexistente", async () => {
    //     const resp = await request.get("/tipos-vendas/500");
    //     expect(resp.statusCode).toBe(404);
    // });
    // test("Inserir tipo de venda", async () => {
    //     const resp = await request.post("/tipos-vendas").send({
    //         descricao: "Infantil"
    //     });
    //     expect(resp.statusCode).toBe(201);
    //     expect(resp.body).toEqual({ "descricao": "Infantil", "id": 99 });
    // });
    // test("Alterar tipode de venda com dados válidos", async () => {
    //     const resp = await request.put("/tipos-vendas/3").send({
    //         descricao: "Ingressos"
    //     });
    //     expect(resp.statusCode).toBe(200);
    //     expect(resp.body).toEqual({
    //         id: 3,
    //         descricao: "Ingressos"
    //     });
    // });
    // test("Excluir um usuário", async () => {
    //     const resp = await request.delete("/tipos-vendas/2");
    //     expect(resp.statusCode).toBe(200);
    //     expect(resp.body).toEqual([{ "descricao": "Bebidas", "id": 1 }, { "descricao": "Ingressos", "id": 3 }]);
    // });
});