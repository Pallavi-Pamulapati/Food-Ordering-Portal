var express = require("express");
var router = express.Router();

// GET request 
// Just a test API to check if server is working properly or not
router.get("/", function(req, res) {
	res.send("API is working properly !");
});
 
/*Here "/" is link req = request (whatever request we get) and
 res = response (whatever we wnat to send) */

module.exports = router;
