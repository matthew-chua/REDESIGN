const express = require("express");
const bodyParser = require("body-parser");
var messagebird = require("messagebird")(process.env.MESSAGEBIRD_TESTAPIKEY);
// var messagebird = require("messagebird")(process.env.MESSAGEBIRD_LIVEAPIKEY);

// Sign In With User
const signInWithPhoneNumberHandler = (req, res) => {
  var phoneNumber = req.body.recipient;
  var params = {
    originator: "Verify OTP",
    Reference: "",
    type: "sms",
    template: "yo matthew the code is *%token* pls tell me this works",
    timeout: "120",
    tokenLength: "6"
  };

  messagebird.verify.create(phoneNumber, params, function (err, response) {
    if (err) {
      res.send({ success: false });
      return console.log(err);
    }
    console.log(response);
    response = { ...response, success: true };
    res.send(response)
  });
};

const verifyOTPHandler = (req, res) => {
  var id = req.body.id; // the id to use is from previous signInWithPhoneNunberHandler response.id (not response.message.id)
  var token = req.body.token;

  // Make request to Verify API
  messagebird.verify.verify(id, token, function (err, response) {
    if (err) {
      // Verification has failed
      console.log("failed: ", err)
      res.send({ success: false });
    } else {
      // Verification was successful
      response = { ...response, success: true };
      // on success, remember to query db for user id

      res.send(response);
    }
  });
};

module.exports = {
  signInWithPhoneNumberHandler,
  verifyOTPHandler,
};
