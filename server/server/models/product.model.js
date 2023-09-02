const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required for a product"],
		unique: [true, "Name must be unique"]
	}
	
}, { timestamps: true });

module.exports = mongoose.model("Product",  ProductSchema);
