const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

	firstName : {
		type: String,
		required : [true, "First Name is Required!"]
	},
	lastName : {
		type: String,
		required : [true, "Last Name is Required!"]
	},
	mobileNo : {
		type: String,
		required : [true, "Mobile No is Required!"]
	},
	email : {
		type: String,
		required : [true, "Email is Required!"]
	},
	password : {
		type: String,
		required : [true, "Password is Required!"]
	},
	isAdmin : {
		type: Boolean,
		default: false
	},
	orderedItems : [{
		productId : {
			type : String,
			required : [true, "Product ID is Required!"]
		},
		quantity : {
			type : Number,
			default : 1
		},
		subTotal : {
			type : Number,
			default : 0
		},
		purchasedOn : {
			type: Date,
			default: new Date()
		}
	}]

})

module.exports = mongoose.model("user", userSchema);


/*enrollments: [{
		courseId : {
			type: String,
			required: [true, "CourseId  is Required!"]
		},
		enrolledOn: {
			type: Date,
			default: new Date()
		},
		status: {
			type: String,
			default: "Enrolled"
		}*/