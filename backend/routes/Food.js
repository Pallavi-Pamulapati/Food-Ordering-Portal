const { response } = require("express");
var express = require("express");
var router = express.Router();

const Food = require("../models/Food");
const Vendor = require("../models/Vendors");

router.get("/", function (req, res) {
    Food.find(function (err, users) {        // here User is a database object(pointing to the database).
        if (err) {
            // console.log("here")
            console.log(err);           // prints the error if any
        } else {
            res.json(users);            // returns in the form of json file.
        }
    })
});

router.post("/vfood", function(req,res){
    const email = req.body.vemail
    Food.find({vemail: email}).then(user => {
        res.json(user)
    })
    .catch(err => {
        console.log(err);
    })
});

router.post("/additem",(req,res) => {
    const newFood = new Food({
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        nv: req.body.nv,
        vemail: req.body.vemail,
        shopname: req.body.shopname,
        count: req.body.count
    });
    console.log(newFood)
    newFood.save()
        .then(user => {
            res.send("Food Added!!")
        })
        .catch(err => {
            res.send("Error!! Unable to Add")
        })
});

router.post("/deleteitem", (req,res) => {
    const id = req.body.id

    Food.deleteOne({_id: id}).then(user =>{
        res.send("Item Deleted !!")
    })
    .catch(err => {
        res.send("Error!! Unable to Delete")
    });
});

router.post("/edititem", (req,res) => {
    const id = req.body.id;

    Food.findOne({_id: id}).then(user => {
        if(user){
            user.name = req.body.name,
            user.price = req.body.price,
            user.rating = req.body.rating,
            user.nv = req.body.nv,
            user.vemail = req.body.vemail

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

router.post("/editcount", (req,res) => {
    const id = req.body.id;

    Food.findOne({_id: id}).then(user => {
        if(user){
            user.count = req.body.count
            console.log(user.count)
            user.save()
                .then(userr => {
                    res.send("count edit Successful !!");
                })
                .catch(err => {
                    res.send("Error !!");
                });
        }
    });
});

router.post("/getshop", (req,res) => {
    const vemail = req.body.vemail;
    Vendor.findOne({email:vemail}).then(user => {
        res.send(user.shopname);
    });
});

module.exports = router;
