// Imports
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv').config();

// App Setup
const app = express();
const port = 3000;
app.use(express.urlencoded({extended : true }));
app.use(express.json());



//message bird stuff

// const exphbs = require('express-handlebars');
// var messagebird = require('messagebird')(process.env.MESSAGEBIRD_TESTAPIKEY)
// var messagebird = require('messagebird')('INPUT_KEY_HERE')
// vid has this for messagebird
// app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');




// Models
const User = require("./User/userSchema");
const Loan = require("./Models/loanSchema");
const Trolley = require("./Models/trolleySchema");
const userRoutes = require("./User/userRoutes");

// DB Config
const password =  process.env.MONGO_PASSWORD;
const username =  process.env.MONGO_USER;
const dbURL = `mongodb+srv://${username}:${password}@cluster0.wjvqv.mongodb.net/redesign`

// Connect to mongoose
mongoose.connect(dbURL )
.then((result)=>{
    console.log("CONNECTED TO DB")
})
.catch((err)=>{
    console.log("ERROR", err)
})

// Routes
app.use('/', require('./User/userRoutes'));






// Create user document
app.get('/createUser', (req, res)=>{
    const user = new User({
        userID: req.get('userID'),
        name: req.get('name'),
        phoneNumber: req.get('phoneNumber'),
        banned: req.get('banned'),
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
    const document = {userID: req.get('userID')}
    const update = {banned: req.get('banned')};

    User.findOneAndUpdate(document, update)
    .then((result)=>{
        res.send(result)
    }).catch(
        (err)=>{
            console.log(err);
            res.send(err)
        }
    )
})

// fetch user
app.get('/fetchUserDetails', (req, res) => {
    const document = {userID: req.get('userID')}
    User.findOne(document)
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
        userID: req.get('userID'),
        loanID: req.get('loanID'),
        trolleyID: req.get('trolleyID'),
        borrowDate: date,
        returned: req.get('returned')
    });

    loan.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
})

//end the loan (return the trolley)
app.get('/endLoan', (req, res) => {
    const document = {userID: req.get('userID')}
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


app.get('/createTrolley', (req, res)=>{
    const trolley = new Trolley({
        trolleyID: req.get('trolleyID'),
        shouldUnlock: req.get('shouldUnlock'),
        isUnlocked: req.get('isUnlocked')
    });

    trolley.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
})

app.get('/setShouldUnlock', (req, res)=>{
    const document = {trolleyID: req.get('trolleyID')}
    const update = {shouldUnlock: true}

    Trolley.findOneAndUpdate(document, update)
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    })
})


app.get('/setIsUnlocked', (req, res)=>{
    const document = {trolleyID: req.get('trolleyID')}
    const update = {isUnlocked: true}

    Trolley.findOneAndUpdate(document, update)
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    })
})


app.get('/returnTrolley', (req, res)=>{
    const document = {trolleyID: req.get('trolleyID')}
    const update = {
        isUnlocked: false,
        shouldUnlock: false
    }

    Trolley.findOneAndUpdate(document, update)
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    })
})


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});


// MESSAGEBIRD STUFF 
// Display page to ask the user for their phone number
app.get('/step1', function(req, res) {
    res.render('step1');
});

// Handle phone number submission 
// app.post('/step2', function(req, res) {
//     var number = req.body.number; 

//     var params = {
//         originator: 'YourName'
//     };

//     messagebird.verify.create('6597102601', params, function (err, response) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(response);
//     res.send({doesItWork: "yes"})
//     });
//     // make request to verify API
//     // messagebird.verify.create(number, {
//     //     template : "Your verification code is %token."
//     // }, function(err, response) {
//     //     if (err) {
//     //         // request has failed
//     //         console.log(err); 
//     //         res.render('step1', {
//     //             error : err.errors[0].description
//     //         });
//     //     } else {
//     //         // request was successful 
//     //         console.log(response);
//     //         res.render('step2', {
//     //             id : response.id
//     //         });
//     //     }
//     // });
// });

// Verify whether the token is correct 
app.post('/step3', function(req, res) {
    var id = req.body.id; 
    var token = req.body.token;

    // Make request to Verify API
    messagebird.verify.verify(id, token, function(err, response) {
        if (err) {
            // Verification has failed
            res.render('step2', {
                error: err.errors[0].description, 
                id : id
            });
        } else {
            // Verification was successful 
            res.render('step3');
        }
    });
});
