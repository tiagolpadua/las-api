const readline = require("readline");

const askQuestion = require("./ask-question");

describe("Desafio", () => {
  test("Deve perguntar uma opção.", async () => {
    jest.spyOn(readline, "createInterface").mockImplementationOnce(() => ({
      question: jest
        .fn()
        .mockImplementationOnce((_questionTest, cb) => cb("bar")),
      close: jest.fn().mockImplementationOnce(() => undefined),
    }));

    let opc = await askQuestion("foo");
    expect(opc).toEqual("bar");
  });
});
