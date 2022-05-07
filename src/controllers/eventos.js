const Evento = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res) => {
    Evento.listarEvento()
      .then((data) => res.status(200).json(data))
      .catch((erro) => res.status(400).json(erro));
  });

  app.post("/eventos", (req, res) => {
    const retornoForm = req.body;

    console.log(retornoForm);

    Evento.incluirEvento(retornoForm)
      .then((resultados) => {
        res
          .status(201)
          .json({ ...resultados, descrição: "Evento incluído com sucesso" });
      })
      .catch((error) =>
        res.status(400).json({ erro: error, descrição: "Entrada inválida" })
      );
  });

  app.get("/eventos/:eventoId", (req, res) => {
    const id = parseInt(req.params.eventoId);
    Evento.buscaEventoId(id)
      .then((results) => {
        if (!results.length) {
          res.status(404).json("Evento não encontrado");
        } else {
          res.status(200).json({
            ...results[0],
            descrição: "Operação bem sucedida",
          });
        }
      })
      .catch((erro) => {
        res.status(400).json("Id inválido fornecido");
        return erro;
      });
  });

  app.get("/eventos/status/:statusEvento", (req, res) => {
    const id = parseInt(req.params.id);

    Evento.buscaEventoId(id)
      .then((results) => {
        if (!results.length) {
          res.status(404).json("Usuário não encontrado");
        } else {
          res.status(200).json({
            ...results[0],
            Mensagem: "Operação bem sucedida",
          });
        }
      })
      .catch((erro) => {
        res.status(400).json("Id inválido fornecido");
        return erro;
      });
  });

  app.put("/eventos/:eventoId", (req, res) => {
    const id = parseInt(req.params.eventoId);
    const retornoForm = req.body;

    console.log(retornoForm);
    Evento.alterarEvento(id, retornoForm)
      .then((resultado) => {
        res
          .status(201)
          .json({ ...resultado, status: "Usuário incluído com sucesso" });
      })
      .catch((erro) => {
        res.status(405).json({ erro: erro, status: "Entrada inválida" });
      });
  });

  app.delete("/eventos/:eventoId", (req, res) => {
    const id = parseInt(req.params.eventoId);

    Evento.excluirEvento(id)
      .then((resultado) => {
        if (!resultado?.affectedRows)
          res.status(404).json("Usuário não encontrado");
        else res.status(204).json("Usuário excluído com sucesso");
      })
      .catch((erro) => {
        if (erro) res.status(400).json("Id inválido fornecido");
      });
  });
};
