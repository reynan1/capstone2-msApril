const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	
	category: {
		type: String,
		required: [true, "Category is required"]
	},
	productName: {
		type: String,
		required : [true, "Product Name is Required!"]
	},
	description: {
		type: String,
		required: [true, "Description is required"]
	},
	price: {
		type: Number,
		required: [true, "Price is required"]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	},
	customers: [{
		userId: {
			type: String,
			required: [true, "UserId is Required!"]
		},
		orderedOn: {
			type: Date,
			default: new Date()
		}	
	}]
})

module.exports = mongoose.model("Product", productSchema);