var express = require("express");
var router = express.Router();

// Load User model 
const User = require("../models/Users");   // importing database schema to do operations linking with the database.
const Vendors = require("../models/Vendors");
const Fav = require("../models/Favourites");
const Food = require("../models/Food");
// GET request 
// Getting all the users from the database
router.get("/", function (req, res) {
    Vendors.find(function (err, users) {        // here User is a database object(pointing to the database).
        if (err) {
            console.log(err);           // prints the error if any
        } else {
            res.json(users);            // returns in the form of json file.
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
 
router.post("/register", (req, res) => {  
          // we are getting name, email and date from the request

    const newUser = new User({          // creating new user object of model user class 
        name: req.body.name,
        email: req.body.email,
        contactno: req.body.contactno,
        age: req.body.age,
        batchname: req.body.batchname,
        password: req.body.password,
        wallet: req.body.wallet
    });
    let response = {
        check : "false"
    } 
    User.findOne({ email: req.body.email }).then(user => {
        // Check if user email exists
        if (!user) {
            // res.send("Registration Sussesfull!!")
            newUser.save()          // to save this in the database.
                .then(user => {     // if successful 
                    response.check = "true"
                    res.status(200).json(response);
                })
                .catch(err => {     // else sending the error 
                    response.check = "error"
                    res.status(400).send(err);
                });
        }
        else {
            response.check = "false"
            res.status(200).json(response);
            return user;
        }
    });
});

// POST request 
// Login


router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    let response = {
        check : "false"
    }
    User.findOne({ email: email, password: password }).then(user => {
        // Check if user email exists
        if (!user) {
            Vendors.findOne({ email: email, password: password }).then(userr => {
                if(!userr){
                    response.check = "false"
                    return res.status(200).json(response);
                }
                else {
                    response.check = "vendor"
                    return res.status(200).json(response);
                }
            })
        }
        else {
            response.check = "buyer"
            res.status(200).json(response);
            return user;
        }
    });
});

router.post("/profile", (req, res) => {
    const email = req.body.email;

    User.findOne({email: email}).then(user => {
        console.log(user);
        res.status(200).json(user);
    })
});

router.post("/edit", (req,res) => {
    const email = req.body.email;

    User.findOne({email: email}).then(user => {
        if(user){
            user.name = req.body.name
            user.age = req.body.age
            user.batchname = req.body.batchname
            user.contactno = req.body.contactno
            user.password = req.body.password

            user.save()
                .then(userr => {
                    res.send("Edit Successful!!");
                })
                .catch(err => {
                    res.send("Error !!");
                });
        }
    })
});

router.post("/addfav", (req,res) => {
    const newFav = new Fav({
        name: req.body.name,
        bemail: req.body.bemail,
        vemail: req.body.vemail,
        nv: req.body.nv,
        shopname: req.body.shopname,
        fid: req.body.fid
    });

    let response = {
        check : "false"
    } 

    Fav.findOne({fid: req.body.fid, bemail: req.body.bemail}).then(user => {
        if(!user){
            console.log("reached")
            newFav.save()
                .then(user => {
                    response.check = "true"
                    res.status(200).json(response);
                })
                .catch(err => {
                    response.check == "error"
                    res.status(200).send(err);
                })
        }
        else {
            response.check = "false"
            res.status(200).json(response)
            return user;
        }
    });
});

router.post("/deletefav",(req,res) => {
    const id = req.body.fid

    Fav.deleteOne({fid: id}).then(user => {
        res.send("Item Deleted !!")
    })
    .catch(err => {
        res.send("Error!! Uable to Delete")
    });
})

router.post("/getfav", (req,res) => {
    const bemail = req.body.bemail

    Fav.find({bemail: bemail}).then(user => {
        res.json(user)
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/editamount", (req,res) => {
    const email = req.body.email

    User.findOne({email: email}).then(user => {
        if(user){
            user.wallet = req.body.wallet

            user.save()
                .then(userr => {
                    res.send("Amount added!!");
                })
                .catch(err => {
                    res.send("Error !!");
                });
        }
    })
})

router.post("/getwallet", (req,res) => {
    const email = req.body.bemail

    User.findOne({email: email}).then(user => {
        if(user)
            res.json(user)
    })
});

module.exports = router;
