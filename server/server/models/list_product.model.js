const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListProduct = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product id reference is required"]
  },

  list_id: {
    type: Schema.Types.ObjectId,
    ref: "List",
    required: [true, "List id reference is required"]
  },

  quantity: {
    type: Number,
    min: [0, "Quantity cannot be less than 0"],
    required: [true, "Must provide a quantity"]
  },

  isChecked: {
    type: Boolean,
    default: false
  }
  
});

module.exports = mongoose.model("ListProduct", ListProduct);
