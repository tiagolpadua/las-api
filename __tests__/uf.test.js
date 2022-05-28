const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());
jest.mock("../src/repositorios/uf");

describe("API de UF e Municipios", () => {

    //ok
    test("Listar UF",async () => {
        const resp = await request.get("/uf");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([
            {
                "sigla": "RO"
            },
            {
                "sigla": "AC"
            },
            {
                "sigla": "AM"
            },
            {
                "sigla": "RR"
            },
            {
                "sigla": "PA"
            },
            {
                "sigla": "AP"
            },
            {
                "sigla": "TO"
            },
            {
                "sigla": "MA"
            },
            {
                "sigla": "PI"
            },
            {
                "sigla": "CE"
            },
            {
                "sigla": "RN"
            },
            {
                "sigla": "PB"
            },
            {
                "sigla": "PE"
            },
            {
                "sigla": "AL"
            },
            {
                "sigla": "SE"
            },
            {
                "sigla": "BA"
            },
            {
                "sigla": "MG"
            },
            {
                "sigla": "ES"
            },
            {
                "sigla": "RJ"
            },
            {
                "sigla": "SP"
            },
            {
                "sigla": "PR"
            },
            {
                "sigla": "SC"
            },
            {
                "sigla": "RS"
            },
            {
                "sigla": "MS"
            },
            {
                "sigla": "MT"
            },
            {
                "sigla": "GO"
            }
        ]);
    });

    test("Listar Municipio",async () => {
        const resp = await request.get("/uf/ba");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([
            "Abaíra",
            "Abaré",
            "Acajutiba",
            "Adustina",
            "Água Fria",
            "Érico Cardoso",
            "Aiquara",
            "Alagoinhas"
        ]);
    });
});