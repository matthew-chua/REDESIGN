const express = require('express')

const User = require("./Models/userSchema");

const app = express();


// create user document

module.exports.creatUser = () => {
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
}

//ban user


//unban user

//get user