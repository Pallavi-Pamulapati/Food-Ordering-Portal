const { response } = require("express");
var express = require("express");
var router = express.Router();

const Vendor = require("../models/Vendors");

router.post("/vregister", (req, res) => {        // we are getting name, email and date from the request
    const newVendor = new Vendor({          // creating new user object of model user class 
        name: req.body.name,
        shopname: req.body.shopname,
        email: req.body.email,
        contactno: req.body.contactno,
        openning: req.body.openning,
        closing: req.body.closing,
        password: req.body.password
    });

    let response = {
        check: "0"
    }
    Vendor.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            Vendor.findOne({ shopname: req.body.shopname }).then(userr => {
                if (!userr) {
                    newVendor.save()          // to save this in the database.
                        .then(userrr => {     // if successful
                            response.check = "0"
                            res.status(200).json(response);
                            // res.send("Created Account")
                        })
                        .catch(err => {     // else sending the error 
                            response.check = "3"
                            res.status(400).send(response);
                        });
                    // return;
                }
                else {
                    response.check = "2"
                    res.status(200).json(response);
                    // return;
                }
            })
        }
        else {
            response.check = "1"
            res.status(200).json(response);
            // return;
        }
    })
});

router.post("/vlogin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let response = {
        check: "false"
    }
    Vendor.findOne({ email: email, password: password }).then(user => {
        if (!user) {
            response.check = "false"
            return res.status(200).json(response);
        }
        else {
            response.check = "true"
            res.status(200).json(response);
            return user;
        }
    })
});

router.post("/profile", (req, res) => {
    const email = req.body.email;
    console.log("reached")
    Vendor.findOne({ email: email }).then(user => {
        console.log(user);
        res.status(200).json(user);
    })
});

router.post("/edit", (req, res) => {
    const email = req.body.email;

    Vendor.findOne({ email: email }).then(user => {
        if (user) {
            user.name = req.body.name
            user.contactno = req.body.contactno
            user.openning = req.body.openning
            user.closing = req.body.closing
            user.password = req.body.password

            user.save()
                .then(userr => {
                    res.send("Edit Successful !!");
                })
                .catch(err => {
                    res.send("Error !!");
                });
        }
    });
});

router.post("/checkavail", (req, res) => {
    const email = req.body.vemail

    Vendor.findOne({ email: email }).then(user => {
        if (user) {
            var spOpen = 0;
            var spClose = 0;
            var shopOpen = 0;
            var shopClose = 0;
            var currDate = new Date();
            var currTime = currDate.getHours() * 60 + currDate.getMinutes();


            spOpen = (user.openning).split(':');
            spClose = (user.closing).split(':');
            shopOpen = parseInt(spOpen[0]) * 60 + parseInt(spOpen[1])
            shopClose = parseInt(spClose[0]) * 60 + parseInt(spClose[1])

            console.log(currTime);
            console.log(shopOpen)
            console.log(shopClose)

            if (currTime > shopOpen && currTime < shopClose) {
                res.send("Available")
            }
            else 
                res.send("UnAvailable")
        }
    })
})

module.exports = router;
