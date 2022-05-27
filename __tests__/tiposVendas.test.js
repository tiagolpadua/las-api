const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");
const request = supertest(customExpress());

jest.mock("../src/repositorios/tiposVendas");

describe("API de Tipos de vendas", () => {
    test("Consultar lista de tipos de vendas", async () => {
        const resp = await request.get("/tipos-vendas");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([{ "descricao": "Bebidas", "id": 1 }, { "descricao": "Alimentação", "id": 2 }, { "descricao": "Abadá / Ingressos", "id": 3 }]);
    });
    test("Consultar tipos de vendas por um id existente", async () => {
        const resp = await request.get("/tipos-vendas/1");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ "descricao": "Bebidas", "id": 1 });
    });
    test("Buscar tipos de vendas por um id inexistente", async () => {
        const resp = await request.get("/tipos-vendas/500");
        expect(resp.statusCode).toBe(404);
    });
    test("Inserir tipo de venda", async () => {
        const resp = await request.post("/tipos-vendas").send({
            descricao: "Infantil"
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({ "descricao": "Infantil", "id": 99 });
    });
    test("Alterar tipode de venda com dados válidos", async () => {
        const resp = await request.put("/tipos-vendas/3").send({
            descricao: "Ingressos"
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            id: 3,
            descricao: "Ingressos"
        });
    });
    test("Excluir um tipo de venda", async () => {
        const resp = await request.delete("/tipos-vendas/2");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([{ "descricao": "Bebidas", "id": 1 }, { "descricao": "Ingressos", "id": 3 }]);
    });
});