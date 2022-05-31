const ufsMock = require("./ufs.json");

class UFs {
    listar() {
        return Promise.resolve(ufsMock);
    }
}

module.exports = new UFs();