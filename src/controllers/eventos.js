const Evento = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res) => {
    Evento.listarEvento()
      .then((data) => res.status(200).json(data))
      .catch((erro) => res.status(400).json(erro));
  });

  app.post("/eventos", (req, res) => {
    const retornoForm = req.body;

    Evento.incluirEvento(retornoForm)
      .then((resultados) => {
        console.log("RESULTADOS", resultados);
        res.status(201).json({
          id: resultados.insertId,
          descrição: "Evento incluído com sucesso",
        });
      })
      .catch((error) => res.status(400).json(error));
  });

  app.get("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Evento.buscaEventoId(id)
      .then((results) => {
        console.log(results);
        if (!Object.keys(results)) {
          res.status(404).json("Evento não encontrado");
        } else {
          res.status(200).json({
            ...results,
            // descrição: "Operação bem sucedida",
          });
        }
      })
      .catch((erro) => {
        res.status(400).json("Id inválido fornecido");
        return erro.code;
      });
  });

  app.get("/eventos/status/:status", (req, res) => {
    const status = req.params.status;

    Evento.buscaEventoPeloStatus(status)
      .then((results) => {
        if (!results.length) {
          res.status(404).json("Status não encontrado");
        } else {
          res.status(200).json(results);
        }
      })
      .catch((erro) => {
        res.status(400).json("Status inválido fornecido");
        return erro;
      });
  });

  app.put("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const retornoForm = req.body;

    Evento.alterarEvento(id, retornoForm)
      // eslint-disable-next-line no-unused-vars
      .then((results) => {
        if (!results.affectedRows)
          res.status(404).json("Evento não encontrado.");
        else
          res.status(204).json({
            estado: "Evento incluído com sucesso",
          });
      })
      .catch((erro) => {
        const erros = erro.sql ? "ID inválido" : erro;
        res.status(405).json(erros);
      });
  });

  app.delete("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Evento.excluirEvento(id)
      .then((resultado) => {
        if (!resultado?.affectedRows)
          res.status(404).json("Evento não encontrado");
        else res.status(204).json("Evento excluído com sucesso");
      })
      .catch((erro) => {
        if (erro) res.status(400).json("Id inválido fornecido");
      });
  });
};
