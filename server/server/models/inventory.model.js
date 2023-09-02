const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "User reference is required"]
	},
	
	product_ids: [{
		type: Schema.Types.ObjectId,
		ref: "ListProduct"
	}]
	
}, { timestamps: true });

module.exports = mongoose.model("Inventory",  InventorySchema);
