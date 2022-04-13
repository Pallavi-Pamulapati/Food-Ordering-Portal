const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    name: {
		type: String,
		required: true
	},
    shopname: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    contactno:{
		type: String,
		required: true
	},
    openning:{
        type: String,
        required: true
    },
    closing:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
});
 
module.exports = Vendor = mongoose.model("Vendors", VendorSchema);