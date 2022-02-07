const Trolley = require("./trolleySchema");
const Constants = require("../Common/Constants");

let clients = [];

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

const fetchTrolleyStreamHandler = (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    "Connection": "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  // To do:
  // connect as a client
  // return trolley details for id
  const trolleyID = req.params.trolleyID;
  Trolley.findOne({ trolleyID: trolleyID })
    .then((result) => {
      if (!result) {
        res.status(400).send({ error: Constants.trolleyNotFound });
        // res.write({error: Constants.})
        return;
      }
      // res.status(200).send(result);
      res.write(`data: ${result}`);
    })
    .catch((err) => {
      res.status(400).send({ error: Constants.invalidRequest });
    });

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    trolleyID: trolleyID,
    response: res,
  };
  clients.push(newClient);
  console.log("clients: ", clients);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
};

const send = (res) => {
  res.write("data: " + "hello!\n\n");
  setTimeout(() => send(res), 1000);
};

function publishNewTrolleyData(updatedTrolleyData) {
  clients.forEach((client) => {
    // only update listeners who've indicated the specific trolley id changed
    if (updatedTrolleyData.trolleyID == client.trolleyID) {
      client.response.write(`data: ${updatedTrolleyData}`);
    }
  });
}

const setIsUnlockedHandler = (req, res) => {
  const trolleyID = { trolleyID: req.body.trolleyID };
  const update = { isUnlocked: req.body.isUnlocked };
  const options = { new: true };
  Trolley.findOneAndUpdate(trolleyID, update, options)
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
  const options = { new: true };

  Trolley.findOneAndUpdate(trolleyID, shouldUnlock, options)
    .then((result) => {
      if (!result) {
        res.status(400).send({ error: Constants.trolleyNotFound });
        return;
      }
      res.status(200).send(result);
      // update all listeners
      publishNewTrolleyData(result);
    })
    .catch((err) => {
      res.status(400).send({ error: Constants.invalidRequest });
    });
};

const returnTrolleyHandler = (req, res) => {
  const trolleyID = { trolleyID: req.body.trolleyID };
  const returned = {
    isUnlocked: false,
    shouldUnlock: false,
  };

  Trolley.findOneAndUpdate(trolleyID, returned, options)
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

module.exports = {
  createTrolleyHandler,
  fetchTrolleyHandler,
  setIsUnlockedHandler,
  setShouldUnlockHandler,
  returnTrolleyHandler,
  fetchTrolleyStreamHandler,
};
