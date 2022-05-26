const customExpress = require("../src/config/customExpress");

describe("Home", () => {
  test("URL Base", async () => {
    const app = customExpress();
    expect(app).toBeDefined();
  });
});
