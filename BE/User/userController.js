// var messagebird = require("messagebird")(process.env.MESSAGEBIRD_TESTAPIKEY);
var messagebird = require("messagebird")(process.env.MESSAGEBIRD_LIVEAPIKEY);
const User = require("./userSchema");
const Constants = require("../Common/Constants");

const fetchUserHandler = (req, res) => {
  const userID = { userID: req.params.userID };

  User.findOne(userID)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({ error: Constants.invalidRequest });
    });
};

// Sign In With User -- User enters mobile number for sms to be sent
const signInWithPhoneNumberHandler = (req, res) => {
  var phoneNumber = req.body.recipient;
  var params = {
    originator: "Verify OTP",
    Reference: "",
    type: "sms",
    template: "yo matthew the code is *%token* pls tell me this works",
    timeout: "120",
    tokenLength: "6",
  };

  messagebird.verify.create(phoneNumber, params, function (err, response) {
    if (err) {
      res.status(400).send({ error: Constants.invalidRequest });
      return console.log(err);
    }
    res.status(200).send(response);
  });
};

// Verify OTP -- User enters OTP
const verifyOTPHandler = (req, res) => {
  var id = req.body.id; // the id to use is from previous signInWithPhoneNunberHandler response.id (not response.message.id)
  var token = req.body.token;

  // Make request to Verify API
  messagebird.verify.verify(id, token, function (err, response) {
    if (err) {
      // Verification has failed
      res.status(400).send({ error: Constants.invalidRequest });
      return console.log(err);
    }
    // Verification was successful
    // on success, remember to query db for user id
    res.status(200).send(response);
  });
};

// Create user from phone number and name
const createUserHandler = (req, res) => {
  User.findOne({ phoneNumber: req.body.phoneNumber })
    .then((result) => {
      if (result) {
        //duplicate found
        res.status(400).send({ error: Constants.duplicatePhoneNumber });
        return;
      }
      const userId = Math.random().toString(16).slice(2);
      const user = new User({
        userID: userId,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        banned: false,
      });
      user
        .save()
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(400).send({ error: Constants.invalidRequest });
        });
    })
    .catch((err) => {
      res.status(400).send({ error: Constants.invalidRequest });
    });
};

const banUserHandler = (req, res) => {
  const document = { userID: req.body.userID };
  const update = { banned: req.body.banned };

  User.findOneAndUpdate(document, update)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({ error: Constants.invalidRequest });
    });
};

module.exports = {
  fetchUserHandler,
  signInWithPhoneNumberHandler,
  verifyOTPHandler,
  createUserHandler,
  banUserHandler,
};
