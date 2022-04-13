const { response } = require("express");
var express = require("express");
var router = express.Router();

const Food = require("../models/Food");
const Vendor = require("../models/Vendors");
const Order = require("../models/Orders");
const User = require("../models/Users");

router.post("/getorders", function (req, res) {
    const email = req.body.bemail
    Order.find({ bemail: email }).then(user => {
        res.json(user)
    })
        .catch(err => {
            console.log(err);
        })
});

router.post("/ordersplaced", function (req, res) {
    const email = req.body.vemail
    Order.find({ vemail: email }).then(user => {
        // console.log(user)
        res.json(user)
    })
        .catch(err => {
            console.log(err);
        })
});

router.post("/addorder", (req, res) => {
    const fid = req.body.fid
    const newOrder = new Order({
        name: req.body.name,
        quantity: req.body.quantity,
        bemail: req.body.bemail,
        vemail: req.body.vemail,
        shopname: req.body.shopname,
        status: req.body.status,
        cost: req.body.cost
    });
    console.log(newOrder)

    User.findOne({ email: req.body.bemail }).then(user => {
        if (user) {
            if (user.wallet >= req.body.cost) {
                newOrder.save()
                    .then(userr => {
                        user.wallet = parseInt(parseInt(user.wallet) - parseInt(req.body.cost))
                        user.save()
                            .then(userrr => {
                                console.log(user)
                            })

                        Food.findOne({ _id: fid }).then(userrrr => {
                            if (userrrr) {
                                userrrr.count = parseInt(userrrr.count) + parseInt(req.body.quantity)
                                userrrr.save()
                                    .then(userrrrr => {
                                        console.log(userrrr)
                                    })
                            }
                        })
                        res.send("Order Placed!!")
                    })
                    .catch(err => {
                        res.send("Error!! unable to place Order")
                        // return
                    })
            }
            else
                res.send("Not enough money")
        }
    })
    // newOrder.save()
    //     .then(user => {
    //         res.send("Order Placed!!")
    //     })
    //     .catch(err => {
    //         res.send("Error!! unable to place Order")
    //     })
});

router.post("/incstatus", (req, res) => {
    const id = req.body.id;

    Order.findOne({ _id: id }).then(user => {
        if (user) {
            user.status = req.body.status

            user.save()
                .then(userr => {
                    res.send("Updated!!")
                    if(req.body.status == 5)
                    {
                        User.findOne({email: user.bemail}).then(userrr =>{
                            userrr.wallet = parseInt(userrr.wallet) + parseInt(user.cost)
                            
                            userrr.save()
                        })
                        .catch(err => {
                            console.log("Error during refund!!")
                        });


                        // console.log()
                    }
                })
                .catch(err => {
                    res.send("Error!!")
                });
        }
    })
})



module.exports = router;