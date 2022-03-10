const Constants = require('../Common/Constants');
const Loan = require("./loanSchema");
const Trolley = require("../Trolley/trolleySchema");

const createLoan = (req, res) => {

  const date = new Date();

  const loanID = Math.random().toString(24).slice(2);

  const trolleyID = req.body.trolleyID
  const options = { new: true };

  const loan = new Loan({
    userID: req.body.userID,
    loanID: loanID,
    trolleyID: trolleyID,
    borrowDate: date,
    returned: false,
  });
  const id = { trolleyID: trolleyID };
  const update = { shouldUnlock: true };
  Trolley.findOneAndUpdate(id, update, options)
    .then((result) => {
      if (!result) {
        res.status(400).send({ error: Constants.trolleyNotFound });
        return;
      }
      console.log("success", result)
    })
    .catch((err) => {
      res.status(400).send({ error: Constants.invalidRequest });
    });

  loan
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({error: Constants.invalidRequest});
    });
};

const endLoan = (req, res) => {
  const document = { trolleyID: req.body.loanID };
  const update = { returned: true };

  Loan.findOneAndUpdate(document, update)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({error: Constants.invalidRequest});
    });
};

const getLoan = (req, res) => {
  const trolleyID = { trolleyID: req.params.loanID };

  Loan.findOne(trolleyID)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({error: Constants.invalidRequest});
    });
};

module.exports = {
  createLoan,
  endLoan,
  getLoan
};
