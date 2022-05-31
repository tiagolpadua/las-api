const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");
const request = supertest(customExpress());

jest.mock("../src/repositorios/ufs");

describe("API UFs", () => {
    test("Consultar lista de UFS", async () => {
        const resp = await request.get("/ufs");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(["RO", "AC", "AM", "RR", "PA", "AP", "TO", "MA", "PI", "CE", "RN", "PB", "PE", "AL", "SE", "BA", "MG", "ES", "RJ", "SP", "PR", "SC", "RS", "MS"]);
    });
}); 