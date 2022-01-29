const express = require('express')

const Loan = require("../Models/loanSchema");

const app = express();

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

//ban user

//unban user

//warn user

//unwarn user

//return trolley
//this should be called by the microcontrollerœ

//get loan