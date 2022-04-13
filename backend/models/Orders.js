const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true,
        min: 1
	},
    bemail:{
        type: String,
        required: true
    },
    vemail:{
        type: String,
        required: true
    },
	shopname:{
		type: String,
		required: true
	},
	status:{
		type: Number,
		required: true,
		default: 0
	},
	cost: {
		type: Number,
		required: true
	}
});

module.exports = Order = mongoose.model("Order", OrderSchema);
