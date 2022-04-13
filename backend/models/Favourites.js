const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FavSchema = new Schema({
	name: {
		type: String,
		required: true
	},
    bemail:{
        type: String,
        required: true
    },
    vemail:{
        type: String,
        required: true
    },
    nv:{
		type: String,
		required: true,
        enum: ['Veg', 'Non-Veg']
	},
	shopname:{
		type: String,
		required: true
	},
	fid: {
		type: String,
		required: true,
	}
});

module.exports = Fav = mongoose.model("Fav", FavSchema);
