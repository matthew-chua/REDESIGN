const Constants = require('../Common/Constants');
const Loan = require("./loanSchema");

const createLoan = (req, res) => {

  const date = new Date();

  const loanID = Math.random().toString(24).slice(2);

  const loan = new Loan({
    userID: req.body.userID,
    loanID: loanID,
    trolleyID: req.body.trolleyID,
    borrowDate: date,
    returned: false,
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
  const document = { loanID: req.body.loanID };
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
  const loanID = { loanID: req.params.loanID };

  Loan.findOne(loanID)
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
