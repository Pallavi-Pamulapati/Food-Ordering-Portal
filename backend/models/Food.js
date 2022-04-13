const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
        min: 0
	},
	rating:{
		type: String,
		required: true,
        default: 0,
        min: 0
	},
	nv:{
		type: String,
		required: true,
        enum: ['Veg', 'Non-Veg']
	},
    vemail:{
        type: String,
        required: true
    },
	shopname:{
		type: String,
		required: true
	},
	count:{
		type: Number,
		default: 0,
		required: true
	}
});

module.exports = Food = mongoose.model("Food", FoodSchema);
