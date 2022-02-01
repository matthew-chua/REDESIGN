const Trolley = require("./trolleySchema");

const createTrolleyHandler = (req, res) => {
  const trolley = new Trolley({
    trolleyID: req.body.trolleyID,
    shouldUnlock: false,
    isUnlocked: false,
  });

  trolley
    .save()
    .then((result) => {
      const response = { ...result._doc, success: true };
      res.send(response);
    })
    .catch((err) => {
      console.log("err:", err);
      res.send({ success: false });
    });
};

const fetchTrolleyHandler = (req, res) => {
  const trolleyID = req.body.trolleyID;
  Trolley.findOne({ trolleyID: trolleyID })
    .then((result) => {
      // const response = { ...result, success: true };
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};

const setIsUnlockedHandler = (req, res) => {
  const trolleyID = { trolleyID: req.body.trolleyID };
  const update = { isUnlocked: req.body.isUnlocked };
  Trolley.findOneAndUpdate(trolleyID, update)
    .then((result) => {
      const response = { ...result._doc, success: true };
      res.send(response);
    })
    .catch((err) => {
      console.log("err: ", err);
      res.send({ success: false });
    });
};

const setShouldUnlockHandler = (req, res) => {
  const trolleyID = { trolleyID: req.body.trolleyID };
  const shouldUnlock = { shouldUnlock: req.body.shouldUnlock };

  Trolley.findOneAndUpdate(trolleyID, shouldUnlock)
  .then((result) => {
    const response = { ...result._doc, success: true };
    res.send(response);
  })
  .catch((err) => {
    console.log("err: ", err);
    res.send({ success: false });
  });
}

const returnTrolleyHandler = (req, res) => {
  const trolleyID = { trolleyID: req.body.trolleyID };
  const returned = { 
    isUnlocked: false,
    shouldUnlock: false,
  };

  Trolley.findOneAndUpdate(trolleyID, returned)
  .then((result) => {
    const response = { ...result._doc, success: true };
    res.send(response);
  })
  .catch((err) => {
    console.log("err: ", err);
    res.send({ success: false });
  });
}
 
module.exports = {
  createTrolleyHandler,
  fetchTrolleyHandler,
  setIsUnlockedHandler,
  setShouldUnlockHandler,
  returnTrolleyHandler
};
