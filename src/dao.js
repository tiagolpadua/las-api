const sqlite3 = require("sqlite3").verbose();

class DAO {
  async open() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(":memory:", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async close() {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("Banco de dados não foi aberto!");
      }

      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async run(sql, params = []) {
    return new Promise((resolve, reject) => {
      if (!sql) {
        reject("SQL não informado!");
      }

      this.db.run(sql, params, (err) => {
        if (err) {
          console.error("Error running sql " + sql);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  // async get(sql, params = []) {
  //   return new Promise((resolve, reject) => {
  //     if (!sql) {
  //       reject("SQL não informado!");
  //     }

  //     this.db.get(sql, params, (err, result) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(result);
  //       }
  //     });
  //   });
  // }

  async all(sql, params = []) {
    return new Promise((resolve, reject) => {
      if (!sql) {
        reject("SQL não informado!");
      }

      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = DAO;
