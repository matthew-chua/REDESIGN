const Loan = require("./loanSchema");

const createLoan = (req, res) => {

  const date = new Date();
  const loan = new Loan({
    userID: req.body.userID,
    loanID: req.body.loanID,
    trolleyID: req.body.trolleyID,
    borrowDate: date,
    returned: false,
  });

  loan
    .save()
    .then((result) => {
      const response = { ...result, success: true };
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};

const endLoan = (req, res) => {
  const document = { loanID: req.body.loanID };
  const update = { returned: true };

  Loan.findOneAndUpdate(document, update)
    .then((result) => {
      const response = { ...result._doc, success: true };
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  createLoan,
  endLoan,
};
