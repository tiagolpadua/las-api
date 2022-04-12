// exports.getById = (req, res) => {
//   UserModel.findById(req.params.userId).then((result) => {
//     res.status(200).send(result);
//   });
// };

module.exports = (app) => {
  app.get("/users/:id?", (req, res) => {
    console.log(req.params);
    res.send("OK");
  });
};
