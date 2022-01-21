const express = require('express')
const mongoose = require('mongoose')

const User = require("./Models/userSchema");
const Loan = require("./Models/loanSchema");


const app = express();
const port = 3000;

//should prolly put the user and password in the env later on lulz
const dbURL = 'mongodb+srv://supermarios:JASONJASON@cluster0.wjvqv.mongodb.net/redesign '

//connect to mongoose
mongoose.connect(dbURL )
.then((result)=>{
    console.log("CONNECTED TO DB")
})
.catch((err)=>{
    console.log("ERROR", err)
})

//create user document
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

//create loan document
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



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});