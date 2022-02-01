const Trolley = require("./trolleySchema");
const Constants = require("../Common/Constants");

const createTrolleyHandler = (req, res) => {
  const trolley = new Trolley({
    trolleyID: req.body.trolleyID,
    shouldUnlock: false,
    isUnlocked: false,
  });

  // Check for duplicates
  Trolley.findOne({ trolleyID: req.body.trolleyID })
    .then((result) => {
      if (result) {
        // Duplicate found, return error
        res.status(400).send({ error: Constants.duplicateTrolleyID });
        return;
      }
      // No Duplicates
      trolley
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

const fetchTrolleyHandler = (req, res) => {
  const trolleyID = req.params.trolleyID;
  Trolley.findOne({ trolleyID: trolleyID })
    .then((result) => {
      if (!result) {
        res.status(400).send({ error: Constants.trolleyNotFound });
        return;
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({ error: Constants.invalidRequest });
    });
};

const setIsUnlockedHandler = (req, res) => {
  const trolleyID = { trolleyID: req.body.trolleyID };
  const update = { isUnlocked: req.body.isUnlocked };
  Trolley.findOneAndUpdate(trolleyID, update)
    .then((result) => {
      if (!result) {
        res.status(400).send({ error: Constants.trolleyNotFound });
        return;
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({ error: Constants.invalidRequest });
    });
};

const setShouldUnlockHandler = (req, res) => {
  const trolleyID = { trolleyID: req.body.trolleyID };
  const shouldUnlock = { shouldUnlock: req.body.shouldUnlock };

  Trolley.findOneAndUpdate(trolleyID, shouldUnlock)
    .then((result) => {
      if (!result) {
        res.status(400).send({error: Constants.trolleyNotFound});
        return;
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({error: Constants.invalidRequest});
    });
};

const returnTrolleyHandler = (req, res) => {
  const trolleyID = { trolleyID: req.body.trolleyID };
  const returned = {
    isUnlocked: false,
    shouldUnlock: false,
  };

  Trolley.findOneAndUpdate(trolleyID, returned)
    .then((result) => {
      if (!result) {
        res.status(400).send({error: Constants.trolleyNotFound});
        return;
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({error: Constants.invalidRequest});
    });
};

module.exports = {
  createTrolleyHandler,
  fetchTrolleyHandler,
  setIsUnlockedHandler,
  setShouldUnlockHandler,
  returnTrolleyHandler,
};
