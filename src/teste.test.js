const {multiplicar} = require("./teste");

test("testar multiplicacao", () => {


   let resultado =  multiplicar(2)(3);

    expect(resultado).toBe(6);

});