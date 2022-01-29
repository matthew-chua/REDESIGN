const express = require('express')
const User = require("./userSchema");

// const app = express();
const { signInWithPhoneNumberHandler, verifyOTPHandler } = require('./userController');
const router = express.Router();

// Routes (They all should just be 1 line)

// Sign in With Phone Number
router.post('/signInWithPhoneNumber', signInWithPhoneNumberHandler)

// Verify User Pin
router.post('/verifyOTP', verifyOTPHandler)

module.exports = router


// create user document
// module.exports.creatUser = () => {
//     app.get('/createUser', (req, res)=>{
//         const user = new User({
//             userID: "122345",
//             name: "new matt",
//             phoneNumber: "12345678",
//             verified: false,
//             banned: false
//         });
    
//         user.save()
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err)
//         });
//     })
// }

//ban user


//unban user

//get user