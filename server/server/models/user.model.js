const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Crear un esquema para usuarios
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	name: {
		type: String , //cada nuevo documento se formateara asi  
		required:[true, "Must provide a name"],
		minlength:[3, "debe tener un minimo de 3 caracateres"],
	},

	email: {
		type: String,
		required: [true, "Email is required"],
		validate: {
			validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
			message: "Please enter a valid email"
		}
	},

	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: [8, "Password must be 8 characters or longer"]
	},

	region: {
		type: String ,
		required:[true, "Must provide a region"],
	},

	comune: {
		type: String,
		required: [true, "Must select a comune"],
	},

	phone: {
		type: Number
	},

	list_ids: [{
		type: Schema.Types.ObjectId,
		ref: "List"
	}],
	
	inventory_id: {
		type: Schema.Types.ObjectId,
		ref: "Inventory"
	}

}, { timestamps: true });


UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => this._confirmPassword = value);

  UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
	}
	next();
});

UserSchema.pre('save', function (next) {
	bcrypt.hash(this.password, 10)
		.then(hash => {
			this.password = hash;
			next();
		});
});	


UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User",  UserSchema);
