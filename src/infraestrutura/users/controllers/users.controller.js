

exports.getById = (req, res) => {
  UserModel.findById(req.params.userId).then((result) => {
      res.status(200).send(result);
  });
};