const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	contactno:{
		type: String,
		required: true
	},
	age:{
		type: Number,
		required: true
	},
	batchname:{
		type: String,
		required: true,
		enum: ['UG1','UG2','UG3','UG4','UG5']
	},
	password:{
		type: String,
		required: true,
	},
	wallet:{
		type: Number,
		required: true,
		default: 0,
		min: 0
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
