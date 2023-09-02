const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({	
	title: {
		type: String,
		required: [true, "Must provide a title"],
		minlength: [3, "debe tener un minimo de 3 caracateres"],
		default: "Lista sin nombre"
	},
	
	author_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "An user id is required as author"],
		immutable: [true, "Cannot change author id"]
	},

	product_ids: [{
		type: Schema.Types.ObjectId,
		ref: "Product"
		// ref: "ListProduct"  
	}]
	
}, { timestamps: true });

module.exports = mongoose.model("List",  ListSchema);
