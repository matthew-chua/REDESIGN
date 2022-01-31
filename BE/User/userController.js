var messagebird = require("messagebird")(process.env.MESSAGEBIRD_TESTAPIKEY);
// var messagebird = require("messagebird")(process.env.MESSAGEBIRD_LIVEAPIKEY);
const User = require("./userSchema");

const fetchUserHandler = (req, res) => {
  const document = { userID: req.body.userID };

  User.findOne(document)
    .then((result) => {
      const response = {...result._doc, success: true}
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
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
      res.send({ success: false });
      return console.log(err);
    }
    console.log(response);
    response = { ...response, success: true };
    res.send(response);
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
      console.log("failed: ", err);
      res.send({ success: false });
    } else {
      // Verification was successful
      response = { ...response, success: true };
      // on success, remember to query db for user id

      res.send(response);
    }
  });
};

// Create user from phone number and name
const createUserHandler = (req, res) => {
  const userId = Math.random().toString(16).slice(2);
  console.log("userId: ", userId);

  const user = new User({
    userID: userId,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    banned: false,
  });
  user
    .save()
    .then((result) => {
        const response = {...result._doc, success: true}
        res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};

const banUserHandler = (req, res) => {
  const document = { userID: req.body.userID };
  const update = { banned: req.body.banned };

  User.findOneAndUpdate(document, update)
    .then((result) => {
      const response = {...result._doc, success: true}
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};



module.exports = {
  fetchUserHandler,
  signInWithPhoneNumberHandler,
  verifyOTPHandler,
  createUserHandler,
  banUserHandler
};
