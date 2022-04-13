const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"
  
// routes
var testAPIRouter = require("./routes/testAPI");    // importing the file
var UserRouter = require("./routes/Users");
var VendorRouter = require("./routes/Vendors");
var FoodRouter = require("./routes/Food");
var OrderRouter = require("./routes/Order");

app.use(cors());       
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// here connection is established between node server and mongodb server locally so that we can acess the data stored or to be stored from the node.

// Connection to MongoDB(can run both on cloud or local server)
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// // setup API endpoints
app.use("/testAPI", testAPIRouter);     // when ever the user goes to the link localhost:4000/testAPI/ redirect him over the testAPIRouter
app.use("/user", UserRouter);
app.use("/vendor", VendorRouter);
app.use("/food",FoodRouter);
app.use("/order", OrderRouter);

// starts the server on the specified port number(4000)
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
