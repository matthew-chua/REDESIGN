const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const User = require("./Models/userSchema");
const Loan = require("./Models/loanSchema");

const app = express();
const port = 3000;

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
        userID: "122345",
        name: "new matt",
        phoneNumber: "12345678",
        verified: false,
        banned: false

    });

    user.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
})



// create loan
app.get('/createLoan', (req, res)=>{
    const loan = new Loan({
        userID: "122345",
        loanID: "testID",
        borrowDate: "12/12/12",
        returned: false,
        banned: false,
        warning: false
    });

    loan.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
})


//ban user logic
//include the EOD logic here also
//call banUser for both user and loan collections


//unlock trolley logic
//call the createLoan
//talk to microcontroller


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});