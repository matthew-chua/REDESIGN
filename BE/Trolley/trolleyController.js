const Trolley = require("./trolleySchema");

const fetchTrolleyHandler = (req, res) => {
  const trolleyID = req.params.trolleyID;
  Trolley.findOne({ trolleyID: trolleyID })
    .then((result) => {
      const response = { ...result._doc, success: true };
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};

const setIsUnlockedHandler = (req, res) => {
    const trolleyID = {trolleyID: req.body.trolleyID}
    const isUnlocked = {isUnlockde: req.body.isUnlocked}
    Trolley.findOneAndUpdate(trolleyID, isUnlocked)
    .then(result => {
        const response = {...result._doc, success: true}
        res.send(response)
    })
    .catch(err => {
        console.log("err: ", err)
        res.send({success: false})
    })
}



module.exports = {
  fetchTrolleyHandler,
  setIsUnlockedHandler
};
