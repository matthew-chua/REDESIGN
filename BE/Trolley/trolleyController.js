const Trolley = require("./trolleySchema");

const fetchTrolleyHandler = (req, res) => {
  const trolleyId = req.params.trolleyId;
  Trolley.findOne({ trolleyID: trolleyId })
    .then((result) => {
      const response = { ...result._doc, success: true };
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};



module.exports = {
  fetchTrolleyHandler,
};
