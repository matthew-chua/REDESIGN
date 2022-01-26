const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = 3000;

//message bird stuff
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
var messagebird = require('messagebird')(process.env.MESSAGEBIRD_TESTAPIKEY)

//models
const User = require("./Models/userSchema");
const Loan = require("./Models/loanSchema");

//db config
require('dotenv').config();
const password =  process.env.MONGO_PASSWORD;
const username =  process.env.MONGO_USER;
const dbURL = `mongodb+srv://${username}:${password}@cluster0.wjvqv.mongodb.net/redesign`

//connect to mongoose
mongoose.connect(dbURL )
.then((result)=>{
    console.log("CONNECTED TO DB")
})
.catch((err)=>{
    console.log("ERROR", err)
})


// create user document
app.get('/createUser', (req, res)=>{
    const user = new User({
        userID: "newid",
        name: "new matt",
        phoneNumber: "12345678",
        banned: false,
        warning: false

    });

    user.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
})

//ban user
app.get('/banUser', (req, res) => {
    const document = {userID: 'newid'}
    const update = {banned: true};

    User.findOneAndUpdate(document, update)
    .then((result)=>{
        res.send(result)
    }).catch(
        (err)=>{
            console.log(err);
        }
    )
})



// create loan
app.get('/createLoan', (req, res)=>{
    const date = new Date();
    const loan = new Loan({
        userID: "newid",
        loanID: "newloadnid",
        trolleyID: "newtrolleyid",
        borrowDate: date,
        returned: false
    });

    loan.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
})

app.get('/returnTrolley', (req, res) => {
    const document = {userID: "newid"}
    const update = {returned: true};

    Loan.findOneAndUpdate(document, update)
    .then((result)=>{
        res.send(result)
    }).catch(
        (err)=>{
            console.log(err);
        }
    )
})


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});